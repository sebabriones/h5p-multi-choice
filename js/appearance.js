var H5P = H5P || {};
H5P.MultiChoiceCFRD = H5P.MultiChoiceCFRD || {};

/**
 * Activity appearance defaults and CSS custom properties for Multiple Choice CFRD.
 */
(function () {
  var APPEARANCE_DEFAULTS = {
    playAreaBackground: '#ffffff',
    alternativeBackground: '#dddddd',
    alternativeHoverBackground: '#ececec',
    alternativeProgressBackground: '#cee0f4',
    alternativeText: '#333333',
    alternativeHoverText: '#333333',
    alternativeProgressText: '#333333',
    alternativeProgressHoverBackground: '#e6effc',
    alternativeProgressHoverText: '#333333',
    questionText: '#333333',
    contextText: '#555555',
    labelPrefixText: '#333333',
    questionFontSize: 1,
    contextFontSize: 1,
    correctBackground: '#b6e4ce',
    correctText: '#255c41',
    wrongBackground: '#fbd7d8',
    wrongText: '#b71c1c',
    questionBackground: 'transparent',
    questionPadding: 0,
    questionBorderRadius: 0.3,
    alternativeBorderRadius: 0.3,
    alternativeBorderWidth: '0',
    alternativeBorderColor: 'transparent',
    alternativeHoverBorderColor: 'transparent',
    alternativeBoxShadow: '0 0.1em 0 rgba(0,0,0,0.3)',
    selectedBorderWidth: '0.125em',
    selectedBorderColor: '#388eff',
    selectedHoverBorderColor: '#388eff',
    selectionIconSize: 1,
    selectionIconTop: '0.25em',
    selectionIconColor: '#494949',
    selectionIconSelectedColor: '#494949',
    questionBorderWidth: '0',
    questionBorderColor: 'transparent',
    feedbackBackground: '#ffffff',
    feedbackTextColor: '#333333',
    correctIcon: '#255c41',
    wrongIcon: '#b71c1c',
    solutionIcon: '#255c41',
    scrollbarWidth: 8,
    scrollbarShowTrack: true,
    scrollbarTrack: '#e8e8e8',
    scrollbarThumb: '#b0b0b0',
    scrollbarThumbHover: '#888888'
  };

  var CSS_VAR_KEYS = {
    playAreaBackground: '--mc-play-area-bg',
    alternativeBackground: '--mc-alternative-bg',
    alternativeHoverBackground: '--mc-alternative-hover-bg',
    alternativeProgressBackground: '--mc-alternative-progress-bg',
    alternativeText: '--mc-alternative-color',
    alternativeHoverText: '--mc-alternative-hover-color',
    alternativeProgressText: '--mc-alternative-progress-color',
    alternativeProgressHoverBackground: '--mc-alternative-progress-hover-bg',
    alternativeProgressHoverText: '--mc-alternative-progress-hover-color',
    questionText: '--mc-question-color',
    contextText: '--mc-context-color',
    labelPrefixText: '--mc-label-prefix-color',
    questionBackground: '--mc-question-bg',
    alternativeBorderWidth: '--mc-alternative-border-width',
    alternativeBorderColor: '--mc-alternative-border-color',
    alternativeHoverBorderColor: '--mc-alternative-hover-border-color',
    alternativeBoxShadow: '--mc-alternative-box-shadow',
    selectedBorderWidth: '--mc-selected-border-width',
    selectedBorderColor: '--mc-selected-border-color',
    selectedHoverBorderColor: '--mc-selected-hover-border-color',
    selectionIconTop: '--mc-selection-icon-top',
    selectionIconColor: '--mc-selection-icon-color',
    selectionIconSelectedColor: '--mc-selection-icon-selected-color',
    questionBorderWidth: '--mc-question-border-width',
    questionBorderColor: '--mc-question-border-color',
    correctBackground: '--mc-correct-bg',
    correctText: '--mc-correct-color',
    wrongBackground: '--mc-wrong-bg',
    wrongText: '--mc-wrong-color',
    correctIcon: '--mc-correct-icon-color',
    wrongIcon: '--mc-wrong-icon-color',
    solutionIcon: '--mc-solution-icon-color',
    feedbackBackground: '--mc-feedback-bg',
    feedbackTextColor: '--mc-feedback-color',
    scrollbarTrack: '--mc-scrollbar-track',
    scrollbarThumb: '--mc-scrollbar-thumb',
    scrollbarThumbHover: '--mc-scrollbar-thumb-hover'
  };

  var CSS_EM_VAR_KEYS = {
    questionPadding: '--mc-question-padding',
    questionBorderRadius: '--mc-question-border-radius',
    alternativeBorderRadius: '--mc-alternative-border-radius',
    questionFontSize: '--mc-question-font-size',
    contextFontSize: '--mc-context-font-size',
    selectionIconSize: '--mc-selection-icon-size'
  };

  var CSS_PX_VAR_KEYS = {
    scrollbarWidth: '--mc-scrollbar-width'
  };

  /**
   * @param {number|string} value
   * @param {number|string} fallback
   * @returns {string}
   */
  function toEm(value, fallback) {
    var num = (value !== undefined && value !== null && value !== '') ?
      Number(value) :
      Number(fallback);

    if (isNaN(num)) {
      num = Number(fallback);
    }

    return num + 'em';
  }

  /**
   * @param {number|string} value
   * @param {number|string} fallback
   * @returns {string}
   */
  function toPx(value, fallback) {
    var num = (value !== undefined && value !== null && value !== '') ?
      Number(value) :
      Number(fallback);

    if (isNaN(num)) {
      num = Number(fallback);
    }

    return num + 'px';
  }

  /**
   * @param {*} value
   * @returns {boolean}
   */
  function isTruthy(value) {
    return value === true || value === 1 || value === '1' || value === 'true';
  }

  /**
   * @param {*} value
   * @param {string} fallback
   * @returns {string}
   */
  function pickString(value, fallback) {
    return (value === undefined || value === null || value === '') ?
      fallback :
      String(value);
  }

  /**
   * @param {*} value
   * @param {number} fallback
   * @returns {number}
   */
  function normalizeAngle(value, fallback) {
    var normalized = parseInt(value, 10);

    if (isNaN(normalized)) {
      normalized = fallback;
    }

    return Math.max(0, Math.min(360, normalized));
  }

  /**
   * @param {number} angle
   * @param {string} colorStart
   * @param {string} colorEnd
   * @returns {string}
   */
  function buildLinearGradient(angle, colorStart, colorEnd) {
    return 'linear-gradient(' + angle + 'deg, ' + colorStart + ', ' + colorEnd + ')';
  }

  /**
   * Resolve solid or gradient fill from editor fields.
   *
   * @param {Object} [group]
   * @param {Object} options
   * @param {string} options.solidKey
   * @param {string} [options.useGradientKey]
   * @param {string} [options.gradientKey]
   * @param {string} options.fallbackSolid
   * @returns {string}
   */
  function resolveFill(group, options) {
    var useGradientKey = options.useGradientKey || 'useGradientBackground';
    var gradientKey = options.gradientKey || 'gradientBackground';
    var solid = pickString(group && group[options.solidKey], options.fallbackSolid);
    var gradient;
    var angle;
    var colorStart;
    var colorEnd;

    if (!isTruthy(group && group[useGradientKey])) {
      return solid;
    }

    gradient = (group && group[gradientKey]) || {};
    angle = normalizeAngle(gradient.angle, 180);
    colorStart = pickString(gradient.colorStart, solid);
    colorEnd = pickString(gradient.colorEnd, colorStart);

    return buildLinearGradient(angle, colorStart, colorEnd);
  }

  /**
   * @param {Object} merged
   * @param {Object} [appearance]
   * @returns {Object}
   */
  function applyBorderAppearance(merged, appearance) {
    var alt = (appearance && appearance.alternativeColors) || {};
    var altBorder = alt.borderSettings || {};
    var selectedBorder = alt.selectedBorderSettings || {};
    var questionArea = (appearance && appearance.questionArea) || {};
    var questionBorder = questionArea.borderSettings || {};

    if (isTruthy(alt.useBorder)) {
      merged.alternativeBorderWidth = toEm(altBorder.borderWidth, 0.05);
      merged.alternativeBorderColor = altBorder.borderColor || '#999999';
      merged.alternativeHoverBorderColor = altBorder.hoverBorderColor ||
        merged.alternativeBorderColor;
      merged.alternativeBoxShadow = 'none';
    }
    else {
      merged.alternativeBorderWidth = '0';
      merged.alternativeBorderColor = 'transparent';
      merged.alternativeHoverBorderColor = 'transparent';
      merged.alternativeBoxShadow = '0 0.1em 0 rgba(0,0,0,0.3)';
    }

    // Default true when undefined (legacy content without the field).
    if (alt.useSelectedBorder === false) {
      merged.selectedBorderWidth = merged.alternativeBorderWidth;
      merged.selectedBorderColor = merged.alternativeBorderColor;
      merged.selectedHoverBorderColor = merged.alternativeHoverBorderColor;
    }
    else {
      merged.selectedBorderWidth = toEm(selectedBorder.borderWidth, 0.125);
      merged.selectedBorderColor = selectedBorder.borderColor || '#388eff';
      merged.selectedHoverBorderColor = selectedBorder.hoverBorderColor ||
        merged.selectedBorderColor;
    }

    if (isTruthy(questionArea.useBorder)) {
      merged.questionBorderWidth = toEm(questionBorder.borderWidth, 0.05);
      merged.questionBorderColor = questionBorder.borderColor || '#cccccc';
    }
    else {
      merged.questionBorderWidth = '0';
      merged.questionBorderColor = 'transparent';
    }

    return merged;
  }

  /**
   * @param {Object} merged
   * @param {Object} [appearance]
   * @returns {Object}
   */
  function applySelectionIconAppearance(merged, appearance) {
    var icons = (appearance && appearance.selectionIcons) || {};
    var position = icons.position || 'inside';

    merged.selectionIconPosition = position;
    merged.selectionIconStyle = icons.style || 'auto';
    merged.selectionIconVerticalAlign = icons.verticalAlign || 'top';
    merged.selectionIconEvaluationPosition = icons.evaluationIconPosition || 'right';
    merged.selectionIconSize = (icons.size !== undefined && icons.size !== null && icons.size !== '') ?
      icons.size :
      APPEARANCE_DEFAULTS.selectionIconSize;
    merged.selectionIconTop = toEm(0.25, 0.25);
    merged.selectionIconColor = pickString(icons.color, APPEARANCE_DEFAULTS.selectionIconColor);
    merged.selectionIconSelectedColor = pickString(
      icons.selectedColor,
      merged.selectionIconColor
    );

    return merged;
  }

  /**
   * @param {Element} el
   * @param {Object} merged
   * @param {Object} [options]
   * @param {boolean} [options.singleAnswer]
   */
  function applySelectionIconClasses(el, merged, options) {
    var positions = ['inside', 'outside', 'none'];
    var styles = ['auto', 'circle', 'square', 'fontawesome'];
    var verticalAlignments = ['top', 'center'];
    var evaluationPositions = ['right', 'left'];
    var inputTypes = ['radio', 'checkbox'];
    var i;
    var position = merged.selectionIconPosition || 'inside';
    var style = merged.selectionIconStyle || 'auto';
    var verticalAlign = merged.selectionIconVerticalAlign || 'top';
    var evaluationPosition = merged.selectionIconEvaluationPosition || 'right';
    var inputType = (options && options.singleAnswer) ? 'radio' : 'checkbox';

    if (!el || !el.classList) {
      return;
    }

    for (i = 0; i < positions.length; i++) {
      el.classList.remove('h5p-mc-icons-' + positions[i]);
    }
    for (i = 0; i < styles.length; i++) {
      el.classList.remove('h5p-mc-icons-' + styles[i]);
    }
    for (i = 0; i < verticalAlignments.length; i++) {
      el.classList.remove('h5p-mc-icons-valign-' + verticalAlignments[i]);
    }
    for (i = 0; i < evaluationPositions.length; i++) {
      el.classList.remove('h5p-mc-icons-eval-' + evaluationPositions[i]);
    }
    for (i = 0; i < inputTypes.length; i++) {
      el.classList.remove('h5p-mc-icons-' + inputTypes[i]);
    }

    el.classList.add('h5p-mc-icons-' + position);
    el.classList.add('h5p-mc-icons-' + style);
    el.classList.add('h5p-mc-icons-valign-' + verticalAlign);
    el.classList.add('h5p-mc-icons-eval-' + evaluationPosition);

    // Needed after check: disableInput strips role, so auto/fontawesome style must be known on play area.
    if (style === 'auto' || style === 'fontawesome') {
      el.classList.add('h5p-mc-icons-' + inputType);
    }
  }

  /**
   * @param {Object} [overallFeedback]
   * @returns {{feedbackBackground: string, feedbackTextColor: string}}
   */
  function getFeedbackColors(overallFeedback) {
    var config = (H5P.QuestionCFRD && H5P.QuestionCFRD.normalizeOverallFeedbackConfig) ?
      H5P.QuestionCFRD.normalizeOverallFeedbackConfig(overallFeedback) :
      {
        popupBackgroundColor: '#ffffff',
        feedbackTextColor: '#333333'
      };

    return {
      feedbackBackground: config.popupBackgroundColor || '#ffffff',
      feedbackTextColor: config.feedbackTextColor || '#333333'
    };
  }

  /**
   * @param {Object} [appearance]
   * @returns {Object}
   */
  function readAppearanceFields(appearance) {
    var alt = (appearance && appearance.alternativeColors) || {};
    var text = (appearance && appearance.textColors) || {};
    var correct = (appearance && appearance.correctColors) || {};
    var wrong = (appearance && appearance.wrongColors) || {};
    var icons = (appearance && appearance.iconColors) || {};
    var questionArea = (appearance && appearance.questionArea) || {};
    var scrollbar = (appearance && appearance.scrollbar) || {};

    return {
      playAreaBackground: appearance && appearance.playAreaBackground,
      alternativeBackground: resolveFill(alt, {
        solidKey: 'background',
        fallbackSolid: APPEARANCE_DEFAULTS.alternativeBackground
      }),
      alternativeHoverBackground: resolveFill(alt, {
        solidKey: 'hoverBackground',
        useGradientKey: 'useHoverGradientBackground',
        gradientKey: 'hoverGradientBackground',
        fallbackSolid: APPEARANCE_DEFAULTS.alternativeHoverBackground
      }),
      alternativeProgressBackground: resolveFill(alt, {
        solidKey: 'progressBackground',
        useGradientKey: 'useProgressGradientBackground',
        gradientKey: 'progressGradientBackground',
        fallbackSolid: APPEARANCE_DEFAULTS.alternativeProgressBackground
      }),
      alternativeProgressHoverBackground: resolveFill(alt, {
        solidKey: 'progressHoverBackground',
        useGradientKey: 'useProgressHoverGradientBackground',
        gradientKey: 'progressHoverGradientBackground',
        fallbackSolid: APPEARANCE_DEFAULTS.alternativeProgressHoverBackground
      }),
      alternativeText: alt.text,
      alternativeHoverText: alt.hoverText,
      alternativeProgressText: alt.progressText,
      alternativeProgressHoverText: alt.progressHoverText,
      alternativeBorderRadius: alt.borderRadius,
      questionText: text.question,
      contextText: text.context,
      questionFontSize: text.questionFontSize,
      contextFontSize: text.contextFontSize,
      labelPrefixText: text.labelPrefix,
      questionBackground: questionArea.background,
      questionPadding: questionArea.padding,
      questionBorderRadius: questionArea.borderRadius,
      correctBackground: correct.background,
      correctText: correct.text,
      wrongBackground: wrong.background,
      wrongText: wrong.text,
      correctIcon: icons.correct,
      wrongIcon: icons.wrong,
      solutionIcon: icons.solution,
      scrollbarWidth: scrollbar.width,
      scrollbarShowTrack: scrollbar.showTrack,
      scrollbarTrack: scrollbar.track,
      scrollbarThumb: scrollbar.thumb,
      scrollbarThumbHover: scrollbar.thumbHover
    };
  }

  /**
   * @param {Object} merged
   * @param {Object} fields
   * @returns {Object}
   */
  function applyIconDefaults(merged, fields) {
    merged.correctIcon = (fields.correctIcon !== undefined &&
      fields.correctIcon !== null &&
      fields.correctIcon !== '') ?
      fields.correctIcon :
      merged.correctText;
    merged.wrongIcon = (fields.wrongIcon !== undefined &&
      fields.wrongIcon !== null &&
      fields.wrongIcon !== '') ?
      fields.wrongIcon :
      merged.wrongText;
    merged.solutionIcon = (fields.solutionIcon !== undefined &&
      fields.solutionIcon !== null &&
      fields.solutionIcon !== '') ?
      fields.solutionIcon :
      merged.correctText;

    return merged;
  }

  /**
   * @param {Object} [appearance]
   * @param {Object|Array} [overallFeedback]
   * @returns {Object}
   */
  function mergeAppearance(appearance, overallFeedback) {
    var merged = {};
    var key;
    var fields = readAppearanceFields(appearance);
    var feedbackColors = getFeedbackColors(overallFeedback);

    for (key in APPEARANCE_DEFAULTS) {
      if (Object.prototype.hasOwnProperty.call(APPEARANCE_DEFAULTS, key)) {
        merged[key] = APPEARANCE_DEFAULTS[key];
      }
    }

    for (key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key) &&
          fields[key] !== undefined &&
          fields[key] !== null &&
          fields[key] !== '') {
        merged[key] = fields[key];
      }
    }

    // Boolean false must be preserved (empty-string guard above skips it intentionally for colors).
    if (fields.scrollbarShowTrack === false || fields.scrollbarShowTrack === true) {
      merged.scrollbarShowTrack = fields.scrollbarShowTrack;
    }

    merged.feedbackBackground = feedbackColors.feedbackBackground;
    merged.feedbackTextColor = feedbackColors.feedbackTextColor;

    if (!fields.questionBackground) {
      merged.questionBackground = 'transparent';
    }

    if (!fields.alternativeHoverText) {
      merged.alternativeHoverText = merged.alternativeText;
    }

    if (!fields.alternativeProgressText) {
      merged.alternativeProgressText = merged.alternativeText;
    }

    if (!fields.alternativeProgressHoverText) {
      merged.alternativeProgressHoverText = merged.alternativeProgressText;
    }

    // If selected-hover background was not set, keep a soft tint of the selected color.
    if (!fields.alternativeProgressHoverBackground) {
      merged.alternativeProgressHoverBackground =
        APPEARANCE_DEFAULTS.alternativeProgressHoverBackground;
    }

    applyIconDefaults(merged, fields);
    applyBorderAppearance(merged, appearance);
    applySelectionIconAppearance(merged, appearance);

    if (merged.scrollbarShowTrack === false) {
      merged.scrollbarTrack = 'transparent';
    }

    return merged;
  }

  /**
   * @param {Object} merged
   * @param {string} key
   * @returns {string}
   */
  function getCssVarValue(merged, key) {
    if (Object.prototype.hasOwnProperty.call(CSS_EM_VAR_KEYS, key)) {
      return toEm(merged[key], APPEARANCE_DEFAULTS[key]);
    }

    if (Object.prototype.hasOwnProperty.call(CSS_PX_VAR_KEYS, key)) {
      return toPx(merged[key], APPEARANCE_DEFAULTS[key]);
    }

    return merged[key];
  }

  /**
   * @param {jQuery} $container
   * @param {Object} [appearance]
   * @param {Object|Array} [overallFeedback]
   * @param {Object} [options]
   * @param {boolean} [options.singleAnswer]
   * @returns {Object}
   */
  function applyAppearanceVars($container, appearance, overallFeedback, options) {
    var merged = mergeAppearance(appearance, overallFeedback);
    var key;
    var i;
    var el;

    if (!$container || !$container.length) {
      return merged;
    }

    for (i = 0; i < $container.length; i++) {
      el = $container[i];

      if (!el || !el.style) {
        continue;
      }

      for (key in CSS_VAR_KEYS) {
        if (Object.prototype.hasOwnProperty.call(CSS_VAR_KEYS, key)) {
          el.style.setProperty(CSS_VAR_KEYS[key], getCssVarValue(merged, key));
        }
      }

      for (key in CSS_EM_VAR_KEYS) {
        if (Object.prototype.hasOwnProperty.call(CSS_EM_VAR_KEYS, key)) {
          el.style.setProperty(CSS_EM_VAR_KEYS[key], getCssVarValue(merged, key));
        }
      }

      for (key in CSS_PX_VAR_KEYS) {
        if (Object.prototype.hasOwnProperty.call(CSS_PX_VAR_KEYS, key)) {
          el.style.setProperty(CSS_PX_VAR_KEYS[key], getCssVarValue(merged, key));
        }
      }

      applySelectionIconClasses(el, merged, options);
    }

    return merged;
  }

  /**
   * Apply play area background on the question wrapper so the evaluation footer
   * (siblings of .h5p-mc-play-area) shares the same card color.
   *
   * @param {jQuery} $root
   * @param {Object} [appearance]
   * @param {Object|Array} [overallFeedback]
   * @returns {Object}
   */
  function applyPlayAreaRootBackground($root, appearance, overallFeedback) {
    var merged = mergeAppearance(appearance, overallFeedback);
    var i;
    var el;
    var bg = merged.playAreaBackground;

    if (!$root || !$root.length) {
      return merged;
    }

    for (i = 0; i < $root.length; i++) {
      el = $root[i];

      if (!el || !el.style) {
        continue;
      }

      el.style.setProperty('--mc-play-area-bg', bg);
      el.style.backgroundColor = bg;
      el.style.setProperty('--mc-scrollbar-width', toPx(merged.scrollbarWidth, APPEARANCE_DEFAULTS.scrollbarWidth));
      el.style.setProperty('--mc-scrollbar-track', merged.scrollbarTrack);
      el.style.setProperty('--mc-scrollbar-thumb', merged.scrollbarThumb);
      el.style.setProperty('--mc-scrollbar-thumb-hover', merged.scrollbarThumbHover);
    }

    return merged;
  }

  /**
   * @param {jQuery} $root
   * @param {Object} [appearance]
   * @param {Object|Array} [overallFeedback]
   */
  function schedulePlayAreaRootBackground($root, appearance, overallFeedback) {
    var apply = function () {
      applyPlayAreaRootBackground($root, appearance, overallFeedback);
    };

    apply();
    setTimeout(apply, 0);
    setTimeout(apply, 50);
    setTimeout(apply, 200);
  }

  /**
   * @param {jQuery} $container
   * @param {Object} [appearance]
   * @param {Object|Array} [overallFeedback]
   * @param {Object} [options]
   * @param {boolean} [options.singleAnswer]
   */
  function scheduleAppearance($container, appearance, overallFeedback, options) {
    var apply = function () {
      applyAppearanceVars($container, appearance, overallFeedback, options);
    };

    apply();
    setTimeout(apply, 0);
    setTimeout(apply, 50);
    setTimeout(apply, 200);
  }

  H5P.MultiChoiceCFRD.Appearance = {
    APPEARANCE_DEFAULTS: APPEARANCE_DEFAULTS,
    mergeAppearance: mergeAppearance,
    applyAppearanceVars: applyAppearanceVars,
    applyPlayAreaRootBackground: applyPlayAreaRootBackground,
    scheduleAppearance: scheduleAppearance,
    schedulePlayAreaRootBackground: schedulePlayAreaRootBackground
  };
})();
