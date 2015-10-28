$(function() {
  var levelAP =
    [0, 10000, 30000, 70000, 150000, 300000, 600000, 1200000, 2400000,
      4000000, 6000000, 8400000, 12000000, 17000000, 24000000, 40000000];

  var actions = {
		ENEMY_PORTAL_HACK : 100,
		FIELD_CREATE : 1250,
		FIELD_DESTROY : 750,
		LINK_CREATE : 313,
		LINK_DESTROY : 187,
		RESO_MAKE : 125,
		RESO_DESTROY : 75,
		RESO_UPGRADE : 65,
		RESO_RECHARGE : 10,
		NEUTRAL_PORTAL : 500,
		SHIELD_MAKE : 150,
		FULL_RESO_BONUS : 250
	};

  function calcValues() {
    var apGivenByActions = 0;

    $('.action').each(function(index, element) {
      var actionClass = element.classList[1];
      apGivenByActions += (element.value * actions[actionClass]);
    });

    calcAP.val(remAP.val() - apGivenByActions);
    afterActionsAP.val(parseInt(curAP.val()) + apGivenByActions);
  }

  var curAP = $('#currentAP');
  var remAP = $('#remainingAP');
  var calcAP = $('#calculatedRemainingAP');
  var afterActionsAP = $('#calculatedReachedAP');

  curAP.on('keyup change', function() {
    var currentAP = curAP.val();

    // compute next level and remaining AP
    var level = 1;
    var nextlevel = 2;
    $.each(levelAP, function(index, value) {
      if(currentAP >= value) {
        level = index + 1;
      }
    });

    if(level < 16) {
      nextlevel = level + 1;
    } else {
      nextlevel = 16;
    }

    $('#levels').val(level + ' -> ' + nextlevel);

    if(level == 16) {
      remAP.prop('disabled', true);
      remAP.val('Play on!');

      $('.calculator').hide();
    } else {
      $('.calculator').show();

      remAP.prop('disabled', false);
      var levelupAP = levelAP[level];

      remAP.val(levelupAP - currentAP);
      calcAP.val(levelupAP - currentAP);
    }
  });

  $('.action').on('keyup change', calcValues);
  curAP.on('keyup change', calcValues);

});
