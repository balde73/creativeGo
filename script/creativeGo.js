$(document).ready(function(){

	reopenNavMenu();

	$("body").on('click', ".open-nav-side", function(){
		$(" <div id='velina' class='close-nav-side Bblack op8'></div> ").appendTo("body")
		$(".nav-side").show()
		setTimeout(function(){$(".nav-side").addClass("nav-side-open")}, 20)
	});

	$("body").on('click', '.close-nav-side', function(){
		$(".nav-side").removeClass("nav-side-open")
		$("#velina").remove()
	});

	// toggle class
	$("body").on('click', '*[toggle-class]', function(){
		var elem = $(this);
		var class_to_toggle = elem.attr("toggle-class")
		elem.toggleClass( class_to_toggle );
	});

	// funzione dropdown su liste
	$("body").on('click', 'li.dropdown', function(event){
		// TO DO insert animation
		$(this).toggleClass("dropdown-active")
	});

	$("body").on('click', 'ul.tabs-selectable li', function(){
		elem 		= $($(this)[0].parentElement)
		classe 		= elem.attr( "tabs-active" )
		call 		= elem.attr( "tabs-call" )
		call_show 	= $(this).attr( "tab-link" )

		all_li = elem[0].children;
		for(i=0; i<all_li.length; i++){
			$(all_li[i]).removeClass( classe )
		}

		$(this).addClass(classe);

		$("*[tabs-called = "+call+"]").each(function(i, elem){
			$(elem).hide();
		});
		$("*[tabs-called = "+call+"]."+call_show).show();

	});

	//MODAL
	//open modal
	$("body").on('click', '*[modal-open]', function(){
		modalID = $(this).attr("modal-open")
		$("#"+modalID).show()

		//trigger function
		callback = $(this).attr("modal-callback")
		var x = eval(callback)
	    if (typeof x == 'function') {
	        x()
	    }
	});
	//close modal
	$("body").on('click', '*[modal-close]', function(){
		modalID = $(this).attr("modal-close")
		$("#"+modalID).hide()

		//trigger function
		callback = $(this).attr("modal-callback")
		var x = eval(callback)
	    if (typeof x == 'function') {
	        x()
	    }
	});

});

function openOnScale( $elem, searchClass, addClass, lastClass ){
	
	$parent = $elem.parentNode
	while( $parent && !( $parent.className == lastClass ) ){

		if( $parent.className == searchClass )
			$parent.className = $parent.className + " " + addClass

		//continuo a salire
		$parent = $parent.parentNode
	}
	return true;
}

function reopenNavMenu(){
	var location_href 	= window.location.href
	var page 			= location_href.match(/(?!.*\/)(.*)/)
	if( page.length ){
		var search = page[0];
		var list = $('.nav-ul [href$="'+search+'"]')
		if( list.length )
			openOnScale( list[0], "dropdown", "dropdown-active", "nav-ul" );
	}
}

var tmpl_toast = '<div class="toast"> STRING_TOAST </div>'
var animation_delay = 450+100
function toast( stringa, timeout, add_class ){

	timeout = timeout || 200
	add_class = add_class || ""
	timeout = (timeout >=200 ) ? timeout : 200

	var toast = tmpl_toast.replace("STRING_TOAST", stringa)

	//creo il container se non esiste
	if( $("#toast-box").length == 0 ){
		$( '<div id="toast-box"></div>' ).appendTo("body")
	}

	// creo il toast
	var myToast = $( toast )
	myToast	.addClass( add_class )
			.appendTo("#toast-box")

	// animazione show
	window.setTimeout(function(){
		myToast.css("bottom", "0")
	}, 10)

	// animazione hide
	window.setTimeout(function(){
		myToast.css("bottom", "-100px")
		window.setTimeout(function(){ myToast.remove() }, animation_delay)
	}, timeout+animation_delay)
}
