var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.MultiChoiceCFRD'] = (function () {
  return {
    1: {
      1: {
        contentUpgrade: function (parameters, finished) {
          // Moved all behavioural settings into "behaviour" group.
          parameters.behaviour = {
            enableRetry: parameters.tryAgain === undefined ? true : parameters.tryAgain,
            enableSolutionsButton: parameters.enableSolutionsButton === undefined ? true : parameters.enableSolutionsButton,
            singleAnswer: parameters.singleAnswer === undefined ? true : parameters.singleAnswer,
            singlePoint: parameters.singlePoint === undefined ? true : parameters.singlePoint,
            randomAnswers: parameters.randomAnswers === undefined ? true : parameters.randomAnswers,
            showSolutionsRequiresInput: parameters.showSolutionsRequiresInput === undefined ? true : parameters.showSolutionsRequiresInput
          };
          if (parameters.UI === undefined) {
            parameters.UI = {};
          }
          parameters.UI.checkAnswerButton = 'Check';
          delete parameters.tryAgain;
          delete parameters.enableSolutionsButton;
          delete parameters.singleAnswer;
          delete parameters.singlePoint;
          delete parameters.randomAnswers;
          delete parameters.showSolutionsRequiresInput;

          finished(null, parameters);
        }
      },
      3: {
        contentUpgrade: function (parameters, finished) {
          parameters.answers.forEach(function (answer) {
            // Add new place for variable and delete old.
            if (answer.tipsAndFeedback === undefined) {
              answer.tipsAndFeedback = {};
            }

            answer.tipsAndFeedback.tip = answer.tip !== undefined ? answer.tip : '';
            answer.tipsAndFeedback.chosenFeedback = answer.chosenFeedback !== undefined ? answer.chosenFeedback : '';
            answer.tipsAndFeedback.notChosenFeedback = answer.notChosenFeedback !== undefined ? answer.notChosenFeedback : '';
            delete answer.tip;
            delete answer.chosenFeedback;
            delete answer.notChosenFeedback;
          });

          finished(null, parameters);
        }
      },

      /**
       * Asynchronous content upgrade hook.
       * Upgrades content parameters to support MC 1.4.
       *
       * Replaces the single answer checkbox with a select field.
       *
       * @params {Object} parameters
       * @params {function} finished
       */
      4: function (parameters, finished) {
        // Determine number of correct choices
        var numCorrect = 0;
        if (parameters.answers) {
          for (var i = 0; i < parameters.answers.length; i++) {
            if (parameters.answers[i].correct) {
              numCorrect++;
            }
          }
        }

        if (!parameters.behaviour) {
          parameters.behaviour = {};
        }
        if (parameters.behaviour.singleAnswer) {
          parameters.behaviour.type = (numCorrect === 1 ? 'auto' : 'single');
        }
        else {
          parameters.behaviour.type = (numCorrect > 1 ? 'auto' : 'multi');
        }
        delete parameters.behaviour.singleAnswer;

        finished(null, parameters);
      },

      /**
       * Asynchronous content upgrade hook.
       * Upgrades content parameters to support Multiple Choice 1.5.
       *
       * Replaces the task image with a media object.
       * Makes it possible to add a video above the task.
       *
       * @params {object} parameters
       * @params {function} finished
       */
      5: function (parameters, finished) {
        if (parameters.image) {
          parameters.media = {
            library: 'H5P.Image 1.0',
            params: {
              file: parameters.image
            }
          };
          delete parameters.image;
        }

        finished(null, parameters);
      },

      /**
       * Asynchronous content upgrade hook.
       * Upgrades content parameters to support Multiple Choice 1.10.
       *
       * Move old feedback message to the new overall feedback system.
       * Do not show the new score points for old content being upgraded.
       *
       * @params {object} parameters
       * @params {function} finished
       */
      10: function (parameters, finished) {

        if (parameters && parameters.UI) {
          if (parameters.UI.correctText) {
            if (parameters.UI.almostText) {
              if (parameters.UI.wrongText) {
                // All specified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 0,
                    'feedback': parameters.UI.wrongText
                  },
                  {
                    'from': 1,
                    'to': 99,
                    'feedback': parameters.UI.almostText
                  },
                  {
                    'from': 100,
                    'to': 100,
                    'feedback': parameters.UI.correctText
                  }
                ];
              }
              else {
                // Only correct and almost specified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 0,
                    'feedback': parameters.UI.feedback || ''
                  },
                  {
                    'from': 1,
                    'to': 99,
                    'feedback': parameters.UI.almostText
                  },
                  {
                    'from': 100,
                    'to': 100,
                    'feedback': parameters.UI.correctText
                  }
                ];
              }
            }
            else {
              if (parameters.UI.wrongText) {
                // Only correct and wrong pecified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 0,
                    'feedback': parameters.UI.wrongText
                  },
                  {
                    'from': 1,
                    'to': 99,
                    'feedback': parameters.UI.feedback || ''
                  },
                  {
                    'from': 100,
                    'to': 100,
                    'feedback': parameters.UI.correctText
                  }
                ];
              }
              else {
                // Only correct specified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 99,
                    'feedback': parameters.UI.feedback || ''
                  },
                  {
                    'from': 100,
                    'to': 100,
                    'feedback': parameters.UI.correctText
                  }
                ];
              }
            }
          }
          else {
            if (parameters.UI.almostText) {
              if (parameters.UI.wrongText) {
                // Only almost and wrong specified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 0,
                    'feedback': parameters.UI.wrongText
                  },
                  {
                    'from': 1,
                    'to': 99,
                    'feedback': parameters.UI.almostText
                  },
                  {
                    'from': 100,
                    'to': 100,
                    'feedback': parameters.UI.feedback || ''
                  }
                ];
              }
              else {
                // Only almost specified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 0,
                    'feedback': parameters.UI.feedback || ''
                  },
                  {
                    'from': 1,
                    'to': 99,
                    'feedback': parameters.UI.almostText
                  },
                  {
                    'from': 100,
                    'to': 100,
                    'feedback': parameters.UI.feedback || ''
                  }
                ];
              }
            }
            else {
              if (parameters.UI.wrongText) {
                // Only wrong specified
                parameters.overallFeedback = [
                  {
                    'from': 0,
                    'to': 0,
                    'feedback': parameters.UI.wrongText
                  },
                  {
                    'from': 1,
                    'to': 100,
                    'feedback': parameters.UI.feedback || ''
                  }
                ];
              }
              else {
                // None specified
                if (parameters.UI.feedback) {
                  parameters.overallFeedback = [
                    {
                      'from': 0,
                      'to': 100,
                      'feedback': parameters.UI.feedback
                    }
                  ];
                }
              }
            }
          }

          // Remove old feedback messages
          delete parameters.UI.correctText;
          delete parameters.UI.almostText;
          delete parameters.UI.wrongText;
          delete parameters.UI.feedback;
        }

        finished(null, parameters);
      },

      13: function (parameters, finished, extras) {
        var title;

        if (parameters && parameters.question) {
          title = parameters.question;
        }

        extras = extras || {};
        extras.metadata = extras.metadata || {};
        extras.metadata.title = (title) ? title.replace(/<[^>]*>?/g, '') : ((extras.metadata.title) ? extras.metadata.title : 'Multiple Choice');

        finished(null, parameters, extras);
      },
      /**
       * Move disableImageZooming from behaviour to media
       *
       * @param {object} parameters
       * @param {function} finished
       */
      14: function (parameters, finished) {
        // If image has been used, move it down in the hierarchy and add disableImageZooming
        if (parameters && parameters.media) {
          parameters.media = {
            type: parameters.media,
            disableImageZooming: (parameters.behaviour && parameters.behaviour.disableImageZooming) ? parameters.behaviour.disableImageZooming : false
          };
        }

        // Delete old disableImageZooming
        if (parameters && parameters.behaviour) {
          delete parameters.behaviour.disableImageZooming;
        }
        finished(null, parameters);
      },

      /**
       * Move legacy top-level media image into context.media (CFRD layout).
       *
       * @param {object} parameters
       * @param {function} finished
       */
      15: function (parameters, finished) {
        var media;
        var library;

        if (!parameters || parameters.context || !parameters.media) {
          finished(null, parameters);
          return;
        }

        media = parameters.media;

        if (!media.type) {
          delete parameters.media;
          finished(null, parameters);
          return;
        }

        library = media.type;

        if (library && library.library && library.library.indexOf('H5P.Image') === 0) {
          parameters.context = {
            media: {
              type: library,
              disableImageZooming: media.disableImageZooming || false
            }
          };
        }

        delete parameters.media;
        finished(null, parameters);
      },

      /**
       * Wrap legacy overallFeedback array in CFRD popup config object.
       *
       * @param {object} parameters
       * @param {function} finished
       */
      16: function (parameters, finished) {
        var overallFeedback = parameters && parameters.overallFeedback;

        if (Array.isArray(overallFeedback)) {
          parameters.overallFeedback = {
            popupBackgroundColor: '#ffffff',
            feedbackTextColor: '#333333',
            overallFeedback: overallFeedback
          };
        }
        else if (overallFeedback && typeof overallFeedback === 'object' && !overallFeedback.popupBackgroundColor) {
          overallFeedback.popupBackgroundColor = '#ffffff';
          overallFeedback.feedbackTextColor = '#333333';
        }

        finished(null, parameters);
      },

      /**
       * Ensure CFRD optional groups exist on legacy content.
       *
       * @param {object} parameters
       * @param {function} finished
       */
      17: function (parameters, finished) {
        if (!parameters) {
          finished(null, parameters);
          return;
        }

        if (!parameters.alternativeLabels || typeof parameters.alternativeLabels !== 'object') {
          parameters.alternativeLabels = {
            enabled: false,
            style: 'uppercase',
            separator: 'period'
          };
        }

        if (!parameters.appearance || typeof parameters.appearance !== 'object') {
          parameters.appearance = {};
        }

        finished(null, parameters);
      }
    }
  };
})();
