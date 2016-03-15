$(document).ready(function(){

	$("body").on('click', ".open-nav-side", function(){
		$(" <div id='velina' class='close-nav-side Bblack op8'></div> ").appendTo("body")
		$(".nav-side").show();
		setTimeout(function(){$(".nav-side").addClass("nav-side-open")}, 20);
	});

	$("body").on('click', '.close-nav-side', function(){
		$(".nav-side").removeClass("nav-side-open")
		$("#velina").remove();
	});


	// funzione dropdown su liste
	$("li.dropdown span").click(function(event){
		// TO DO insert animation
		elem = $($(this)[0].parentElement)
		elem.toggleClass("dropdown-active")
		
	});

	$("ul.tag-selectable li").click(function(){
		elem 		= $($(this)[0].parentElement)
		classe 		= elem.attr( "data-attr" )
		call 		= elem.attr( "data-call" )
		call_show 	= $(this).attr( "data-link" )

		all_li = elem[0].children;
		for(i=0; i<all_li.length; i++){
			$(all_li[i]).removeClass( classe )
		}

		$(this).addClass(classe);
		$("."+call).each(function(i, elem){
			$(elem).hide();
		});
		$("."+call_show).show();

	});

	$(".changer").change(function(){
		var modifica = $(this).attr("data-attr")
		var valore   = $(this).val()
		if(valore && valore!=""){
			$($($(".code-preview")[0])[0].childNodes).attr("data-"+modifica, valore)
		}
		else{
			$($($(".code-preview")[0])[0].childNodes).removeAttr("data-"+modifica)
		}
		aggiornaCodice()
	});


	reopenNavMenu();

	//MODAL
	//open modal
	$(".modal-trigger").click(function(){
		modalID = $(this).attr("data-modal")
		f = $(this).attr("data-function")
		$("#"+modalID).show()
		if( f ) window[f]()
	});
	//close modal
	$(".modal .modal-close").click(function(){
		console.log($(this))
		//salgo fino a trovare un ID
		modalID = ""
		$elem 	= $(this)[0]
		while( modalID == "" ){
			$elem = $elem.parentElement
			modalID = $elem.id
		}
		$("#"+modalID).hide()
	});


});

function openOnScale( $elem, searchClass, addClass, lastClass ){
	
	$parent = $elem.parentNode
	while( $parent && !( $parent.className == lastClass ) ){

		if( $parent.className == searchClass ){
			$parent.className = $parent.className + " " + addClass

		}

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

function copyInModal(){
	testo 		= $("#prime-code").text()
	html_code  	= 	'<div class="">'+
					'	<div class="paddTB10 center">'+
					'		Copia il codice (Ctrl+C) e chiudi'+
					'	</div>'+
					'	<div class="paddTB20">'+
					'		<textarea class="padd10" rows="5"></textarea>'+
					'	</div>'+
					'</div>'

	$("#modal-copy .modal-body").html(html_code)
	$("#modal-copy textarea"   ).val( testo )
								.select()
}


var tmpl_toast = '<div class="toast"> STRING_TOAST </div>'
var animation_delay = 450+100;
function toast( stringa, timeout=200, add_class="" ){

	timeout = (timeout >=200 ) ? timeout : 200;

	var toast = tmpl_toast.replace("STRING_TOAST", stringa);

	//creo il container se non esiste
	if( $("#toast-box").length == 0 ){
		$( '<div id="toast-box"></div>' ).appendTo("body");
	}

	// creo il toast
	var myToast = $( toast );
	myToast	.addClass( add_class )
			.appendTo("#toast-box");

	// animazione show
	window.setTimeout(function(){
		myToast.css("bottom", "0");
	}, 10);

	// animazione hide
	window.setTimeout(function(){
		myToast.css("bottom", "-100px");
		window.setTimeout(function(){ myToast.remove() }, animation_delay);
	}, timeout+animation_delay)
}
