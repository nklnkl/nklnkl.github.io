jQuery(document).ready(function() {
  var input = {};
  // Upon start, we have no element selected.
  input.selected = null;
  // Upon start, input is ready to change.
  input.ready = true;
  // The tool input is using. 1: move by default.
  input.tool = 1;
  // The position cache for input.
  input.position = {};
  input.position.x = 0;
  input.position.y = 0;

  // The properties for an element we selected.
  var element = {};
  element.left = 0;
  element.top = 0;
  element.width = 0;
  element.height = 0;

  // The array of templates.
  var templates = [];
  // The current template.
  var template = 0;

  // The boolean for if the editor hasn't received any images yet.
  var frontUploaded = false;
  var sideUploaded = false;

  // The deluxe template data set.
  templates.push({
    name: 'Deluxe',
    width: '290px',
    height: '362px',
    front: {
      transform: 'perspective(281px) rotateY(-23deg) translateY(-39px) translateX(56px) translateZ(-148px)',
      height: '417px',
      width: '146px',
      'transform-origin': 'center'
    },
    side: {
      transform: 'perspective(281px) rotateY(23deg) rotateZ(-1deg) translate(270px, -27px)',
      height: '409px',
      width: '146px',
      'transform-origin': 'center'
    },
    background: 'https://nklnkl.github.io/faceplace-booth-editor/booth-red.png'
  });

  // The SceneMachine template data set.
  templates.push({
    name: 'SceneMachine',
    width: '263px',
    height: '362px',
    front: {
      transform: 'perspective(700px) rotateY(45deg) rotateZ(-1deg) translateY(52px) translateX(238px) translateZ(53px)',
      height: '271px',
      width: '119px',
      'transform-origin': 'center'
    },
    side: {
      transform: 'perspective(700px) rotateY(-42deg) rotateZ(1deg) translateX(-5px) translateY(52px) translateZ(18px)',
      height: '274px',
      width: '124px',
      'transform-origin': 'center'
    },
    // background: 'https://nklnkl.github.io/faceplace-booth-editor/SceneMachine.png'
    background: 'https://nklnkl.github.io/faceplace-booth-editor/custom-SceneMachine.png'
  });

  // The ThemePark template data set.
  templates.push({
    name: 'ThemePark',
    width: '387px',
    height: '362px',
    front: {
      transform: 'perspective(700px) rotateY(-43deg) translateY(73px) translateX(181px) translateZ(0px)',
      width: '100px',
      height: '220px',
      'transform-origin': 'center'
    },
    side: {
      transform: 'perspective(700px) rotateY(47deg) translateY(66px) translateX(172px) translateZ(171px)',
      height: '267px',
      width: '121px',
      'transform-origin': 'center'
    },
    // background: 'https://nklnkl.github.io/faceplace-booth-editor/ThemePark.png'
    background: 'https://nklnkl.github.io/faceplace-booth-editor/custom-ThemePark.png'
  });

  // The Photo2Go template data set.
  templates.push({
    name: 'Photo2Go',
    width: '301px',
    height: '362px',
    front: {
      transform: 'perspective(281px) rotateY(0deg) translateY(-58px) translateX(260px) translateZ(-148px)',
      height: '417px',
      width: '146px',
      'transform-origin': 'center'
    },
    side: {
      transform: 'perspective(281px) rotateY(0deg) rotateZ(0deg) translate(5px, 25px)',
      height: '334px',
      width: '35px',
      'transform-origin': 'center'
    },
    // background: 'https://nklnkl.github.io/faceplace-booth-editor/Photo2Go.png'
    background: 'https://nklnkl.github.io/faceplace-booth-editor/custom-Photo2Go.png'
  });

  // The Ruby template data set.
  templates.push({
    name: 'Ruby',
    width: '396px',
    height: '697px',
    front: {
      transform: 'perspective(700px) rotateY(-26deg) translateY(9px) rotateZ(0deg) translateX(5px) translateZ(0px)',
      height: '318px',
      width: '146px',
      'transform-origin': '0px 80px'
    },
    side: {
      transform: 'perspective(700px) rotateY(52deg) translateY(-5px) translateX(155px) translateZ(95px)',
      height: '383px',
      width: '126px',
      'transform-origin': '0px 76px'
    },
    // background: 'https://nklnkl.github.io/faceplace-booth-editor/Ruby.png'
    background: 'https://nklnkl.github.io/faceplace-booth-editor/custom-Ruby.png'
  });

  // The Sapphire template data set.
  templates.push({
    name: 'Sapphire',
    width: '165px',
    height: '362px',
    front: {
      transform: 'perspective(700px) rotateY(27deg) translateY(2px) translateX(24px) translateZ(0px)',
      height: '349px',
      width: '155px',
      'transform-origin': 'center'
    },
    side: {
      transform: 'perspective(700px) rotateY(-72deg) translateY(103px) translateX(-95px) translateZ(25px)',
      height: '265px',
      width: '119px',
      'transform-origin': 'center'
    },
    // background: 'https://nklnkl.github.io/faceplace-booth-editor/Sapphire.png'
    background: 'https://nklnkl.github.io/faceplace-booth-editor/custom-Sapphire.png'
  });

  // The function for selecting an element.
  var divSelect = function (target, pageX, pageY) {
    console.log(input.select, input.ready);
    // If we don't already have an element selected.
    if (input.select == null && input.ready == true) {
      // Select this element, and set input change ready to false.
      input.select = jQuery(target);
      input.ready = false;
      console.log(input.select, input.ready);

      // Cached the selected input's origin properties.
      element.left = parseInt(input.select.css('left').replace('px', ''));
      element.top = parseInt(input.select.css('top').replace('px', ''));
      element.width = parseInt(input.select.css('width').replace('px', ''));
      element.height = parseInt(input.select.css('height').replace('px', ''));

      // Cache the starting position of this click.
      input.position.x = pageX;
      input.position.y = pageY;

      // Change cursor depending on tool selected.
      switch (input.tool) {
        case 1:
        jQuery('#booth-container').css({
          'cursor': 'move'
        });
        break;
        case 2:
        jQuery('#booth-container').css({
          'cursor': 'ne-resize'
        });
        break;
        case 3:
        jQuery('#booth-container').css({
          'cursor': 'nesw-resize'
        });
        break;
      }
    }
  }

  jQuery('#booth-background-front').on('mousedown', '.booth-image', function (event) {
    divSelect(this, event.pageX, event.pageY);
  });

  // When booth-image is clicked. (1a. user clicks an element.)
  jQuery('#booth-background-side').on('mousedown', '.booth-image', function(event) {
    divSelect(this, event.pageX, event.pageY);
  });

  // When booth-preview is unclicked. (2. user unclicks after clicking an element.)
  jQuery('#booth-preview').on('mouseup', function(event) {
    // If we have an element selected and input is not ready to change.
    if (input.select && input.ready == false) {
      // Set input ready for change.
      input.ready = true;
    }
  });

  // When booth-preview is clicked. (3. user clicks to finalize an element.)
  jQuery('#booth-preview').on('mousedown', function(event) {
    // If we have an element selected && input is ready for change.
    if (input.select && input.ready) {
      // Nullify input select.
      input.select = null;
      jQuery('#booth-container').css({
        'cursor': 'default'
      });
    }
  });

  /* Tool Buttons Listeners */
  // Upon clicking the move tool.
  jQuery('#booth-move').on('mousedown', function() {
    // Change tool setting to move.
    input.tool = 1;
    // If we have an element selected.
    if (input.select) {
      // Set the cursor for the whole container to move.
      jQuery('#booth-container').css({
        'cursor': 'move'
      });
      // Else if we don't have an element selected.
    } else {
      // Only change the cursor for any booth images.
      jQuery('.booth-image').css({
        'cursor': 'move'
      });
    }
  });
  jQuery('#booth-rotate').on('mousedown', function() {
    // Change tool setting to move.
    input.tool = 2;
    // If we have an element selected.
    if (input.select) {
      // Set the cursor for the whole container to move.
      jQuery('#booth-container').css({
        'cursor': 'ne-resize'
      });
      // Else if we don't have an element selected.
    } else {
      // Only change the cursor for any booth images.
      jQuery('.booth-image').css({
        'cursor': 'ne-resize'
      });
    }
  });
  jQuery('#booth-scale').on('mousedown', function() {
    // Change tool setting to move.
    input.tool = 3;
    // If we have an element selected.
    if (input.select) {
      // Set the cursor for the whole container to move.
      jQuery('#booth-container').css({
        'cursor': 'nesw-resize'
      });
      // Else if we don't have an element selected.
    } else {
      // Only change the cursor for any booth images.
      jQuery('.booth-image').css({
        'cursor': 'nesw-resize'
      });
    }
  });
  // When the next template button is clicked.
  jQuery('#booth-next').on('mouseup', function () {
    // If we haven't reached the maximum number of templates yet.
    if (template < templates.length - 1) {
      // Increment the template count.
      template++;
      // Change the css properties.
      jQuery('#booth-background-front').css(templates[template].front);
      jQuery('#booth-background-side').css(templates[template].side);
      jQuery('#booth-background').css({
        'height': templates[template].height,
        'width': templates[template].width,
        'background-image': 'url(' + templates[template].background + ')'
      });
    }
  });

  // When the prev template button is clicked.
  jQuery('#booth-prev').on('mouseup', function () {
    // If we haven't reached the first template yet.
    if (template > 0) {
      // Decrement the template count.
      template--;
      // Change the css properties.
      jQuery('#booth-background-front').css(templates[template].front);
      jQuery('#booth-background-side').css(templates[template].side);
      jQuery('#booth-background').css({
        'height': templates[template].height,
        'width': templates[template].width,
        'background-image': 'url(' + templates[template].background + ')'
      });
    }
  });

  // Lisener for mouse movement in the preview container.
  jQuery('#booth-preview').on('mousemove', function(event) {
    // If input has an element selected.
    if (input.select != null) {
      // Get the delta between the first click coordinate and the current coordinate.
      var dx = (event.pageX - input.position.x);
      var dy = (event.pageY - input.position.y);
      switch (input.tool) {
        case 1: // If we are in the move state.
        // Change the css property of the element selected.
        input.select.css({
          'left': element.left + dx,
          'top': element.top + dy
        });
        break;
        case 2: // If we are in the rotate state.
        input.select.css({
          transform: 'rotateZ(' + dy + 'deg)'
        });
        break;
        case 3: // If we are in the scale state.
        input.select.css({
          height: (element.height + dy),
          width: (element.width + dy)
        });
        break;
      }
    }
  });

  /* Listener for color changer */
  jQuery('#booth-control-color-slider').on('change', function() {
    jQuery('#booth-background').css('filter', 'hue-rotate(' + jQuery(this).val() + 'deg)');
    jQuery('.booth-image').css('filter', 'hue-rotate(-' + jQuery(this).val() + 'deg)');
  });
  /* Listener for color changer */

  /* Listener for file upload buttons. */
  jQuery('#front-button').on('change', function() {
    readURL(this, 'front');
    jQuery(this).val('');
  });
  jQuery('#side-button').on('change', function() {
    readURL(this, 'side');
    jQuery(this).val('');
  });
  /* Listener for file upload buttons. */

  /* File reader and appender. */
  var reader = new FileReader();

  function readURL(input, section) {
    if (input.files && input.files[0]) {

      // Declare the target image element.
      var target;

      // If section is 'front'
      if (section == 'front') {
        // If there are already images uploaded to the front.
        if (frontUploaded) {
          // Create a new one.
          var target = jQuery('<div class="booth-image">');
          // Append to the front.
          target.appendTo('#booth-background-' + section);
        } else {
          // Select the placeholder on the front.
          target = jQuery('#booth-background-' + section + ' > .booth-image');
          frontUploaded = true;
        }
      }
      if (section == 'side') {
        // If there are already images uploaded to the front.
        if (sideUploaded) {
          // Create a new one.
          var target = jQuery('<div class="booth-image">');
          // Append to the front.
          target.appendTo('#booth-background-' + section);
        } else {
          // Select the placeholder on the front.
          target = jQuery('#booth-background-' + section + ' > .booth-image');
          sideUploaded = true;
        }
      }

      // Upon loading the image.
      reader.onload = function(e) {

        // The dimensions of the image to load.
        var width, height;

        // Buffer the image to read its contents.
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {

          // Save dimensions.
          width = this.width * 0.1;
          height = this.height * 0.1;

          // Set the selected image's background image to the uploaded image, and dimensions.
          target.css({
            'background-image': 'url(' + e.target.result + ')',
            width: width,
            height: height,
            'background-color': 'transparent'
          });

          target.text("");
        }

      }

      reader.readAsDataURL(input.files[0]);
    }

  }
  /* File reader and appender. */

});
