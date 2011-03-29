/* 
	fakeSelect Plugin - Function to create fake select box and drop down around a select box with an ID
	Created By: Brian Bouril
	Date: March 23, 2010
*/
// TEST	
$.fn.fakeSelect = function(){
		selectBox = $(this);
		selectBox.hide();
		selectId = selectBox.attr('id');
			
		selectBox.wrap('<div id="'+selectId+'Parent" class="fakeDDSelect" />');
		$('body').append('<div class="'+selectId+' fakeFitmentDD hide" style="display:none;"><a href="javascript:;">Choose...</a></div>');
			
		// --JS to Skin Select Boxes
		selectBox.before('<div class="select-text">a</div>').each(
		  function() {
		  	firstOption = $(this).find(":first-child").html();
			$(this).prev().text(firstOption);
			//console.log(firstOption);
		  }
		);
		// Adding the class to change the BG image to "disabled"
		if(selectBox.attr('disabled'))
		{
			selectBox.parent().addClass('disabled');
		}
		
		// BEGIN - Main Trigger for fakeDD 
		selectBox.parent().click(function(){
				thisId = $(this).find('select').attr('id');
				idSelect = $('#'+thisId+'');
				classFakeDD = $('.'+thisId+'');
				selectBoxH = $(this).height();
				selectBoxPos = $(this).offset();
			
				classFakeDD.css({'left':(selectBoxPos.left) + "px" , 'top':(selectBoxPos.top + selectBoxH) + "px"}).empty();
				
				// BEGIN Populate the fakeDD with optgroups and contents 
				selectHtml = idSelect.html();
				classFakeDD.append(selectHtml);
				
				$('.'+thisId+' option').each(function(){
					thisHtml = $(this).html();
					$(this).replaceWith($('<a href="javascript:;">' + thisHtml + '</a>'));
				});
				
				$('.'+thisId+' optgroup').each(function(){
					optGroupLabel = $(this).attr('label');
					optGroupHtml = $(this).html();
					$(this).replaceWith($('<div class="fakeOptGroup" title="'+ optGroupLabel+'">' + optGroupLabel + '</div>'));
					$('.fakeOptGroup[title='+ optGroupLabel+']').after(optGroupHtml);
				});

				// BEGIN - Set the Height and Width of the fakeDD        
				fakeDDHeight = $('.'+thisId+'').height();
				fakeDDMaxHeight = 200;
				fakeDDWidth = $('.'+thisId+'').width();
				fakeDDMinWidth = 160;
				fakeDDMaxWidth = fakeDDWidth + 75;
				// Set height of the fakeDD
				if (fakeDDHeight>=200) {	
					classFakeDD.css({'height' : fakeDDMaxHeight + "px"});
				}
				
				// Set Width of the fakeDD
				if (fakeDDWidth<=160) {	
					classFakeDD.css({'width' : fakeDDMinWidth + "px"});
				} else {
					classFakeDD.css({'width' : fakeDDMaxWidth + "px"});
				}

				/* BEGIN - Show and Hide of fakeDD
		         	- Truncate and Populate fake select text
				 	- Set value of original select       
				 */				
				if (classFakeDD.hasClass('hide'))
				{
					classFakeDD.show().removeClass('hide').addClass('show');
					// choosing an option from the fake DD
					$('.'+thisId+'.fakeFitmentDD a').click(function(){
						$(this).parent().hide().removeClass('show').addClass('hide');								 
						var truncSVehic = $(this).text();
						var sVehic = $(this).text();
						$(this).parent().hide();
						//truncate the text selected
						if(truncSVehic.length>12){
							truncSVehic = truncSVehic.substr(0,12)+'...'
						}else{
							truncSVehic = truncSVehic
						};
						//$(this).addClass('selected').siblings().removeClass('selected'); // Set the fakeDD selected option
						//$('#'+thisId+' option[text='+sVehic+']').attr('selected','selected').siblings().attr('selected', false); // Use to set selected option in hidden select
						$('#'+thisId).val(sVehic);
						$('#'+thisId).change();
						idSelect.prev().text(truncSVehic); // Set selected option text in fake select
						idSelect.parent().next().removeClass('disabled'); // Change BG image
						idSelect.parent().next().find('select').attr('disabled', false) // Enable hidden select box
					})
				} 
				else 
				{ 
					classFakeDD.hide().removeClass('show').addClass('hide'); 
				}
			});
			
		// Close fakeDD
		 $('.'+selectId+'').mouseleave(function(){
				 $(this).hide().removeClass('show').addClass('hide');	
		 });
	
	
			
			
}; //END OF PLUGIN