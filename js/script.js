$(function() {
    $(window).keyup(function(e){
        var target = $('.checkbox-btn input:focus');
        if (e.keyCode == 9 && $(target).length){
            $(target).parent().addClass('focused');
        }
    });

    $('.checkbox-btn input').focusout(function(){
        $(this).parent().removeClass('focused');
    });

    $('.input-file input[type=file]').on('change', function(){
        let file = this.files[0];
        $(this).next().html(file.name);
    });

    $(document).ready(function() {
        $('.js-road').select2({
            minimumResultsForSearch: Infinity
        });
    });

    $(document).ready(function() {
        $('.js-city').select2({
            minimumResultsForSearch: Infinity
        });
    });

    $(document).ready(function() {
        $('.js-work').select2({
            minimumResultsForSearch: Infinity
        });
    });

});
let flip = 0;
function openNav() {
    $(".menu-wrapper").toggle("slide", function() {
        flip++
        if( flip % 2 ){
            $(".menu-btn-mobi").html("<svg width=\"21\" height=\"20\" viewBox=\"0 0 21 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "<path d=\"M9.08594 10L0.954102 18.1318L2.36816 19.5461L10.5 11.4143L18.6318 19.5459L20.0459 18.1318L11.9141 10L20.0459 1.86841L18.6318 0.454102L10.5 8.58594L2.36816 0.454102L0.954102 1.86841L9.08594 10Z\" fill=\"white\"/>\n" +
                "</svg>");
        }else {
            $(".menu-btn-mobi").html("<svg width=\"30\" height=\"19\" viewBox=\"0 0 30 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                                <path d=\"M0 0H30V2H0V0Z\" fill=\"white\"/>\n" +
                "                                <path d=\"M0 8.5H30V10.5H0V8.5Z\" fill=\"white\"/>\n" +
                "                                <path d=\"M0 17H30V19H0V17Z\" fill=\"white\"/>\n" +
                "                            </svg>");
        }
        
    });
}

$("#tabs").easyResponsiveTabs({
    type: 'default', //Типы: default, vertical, accordion
    width: 'auto', //auto или любое значение ширины
    fit: true,   // 100% пространства занимает в контейнере
    closed: false,
    tabidentify: 'tab_identifier_parent',
    activate: function() {} // Функция обратного вызова, используется, когда происходит переключение вкладок
});
$("#ChildTab").easyResponsiveTabs({
    type: 'default', //Типы: default, vertical, accordion
    width: 'auto', //auto или любое значение ширины
    fit: true,   // 100% пространства занимает в контейнере
    closed: false,
    tabidentify: 'tab_identifier_child',
    activate: function() {} // Функция обратного вызова, используется, когда происходит переключение вкладок
});






const dropFileZone = document.querySelector(".upload-zone_dragover")
const statusText = document.getElementById("uploadForm_Status")
const sizeText = document.getElementById("uploadForm_Size")
const uploadInput = document.querySelector(".form-upload__input")

let setStatus = (text) => {
    statusText.textContent = text
}

const uploadUrl = "/unicorns";

["dragover", "drop"].forEach(function(event) {
    document.addEventListener(event, function(evt) {
        evt.preventDefault()
        return false
    })
})

dropFileZone.addEventListener("dragenter", function() {
    dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function() {
    dropFileZone.classList.remove("_active")
})

dropFileZone.addEventListener("drop", function() {
    dropFileZone.classList.remove("_active")
    const file = event.dataTransfer?.files[0]
    if (!file) {
        return
    }

    if (file.type.startsWith("image/")) {
        uploadInput.files = event.dataTransfer.files
        processingUploadFile()
    } else {
        setStatus("Можно загружать только изображения")
        return false
    }
})

uploadInput.addEventListener("change", (event) => {
    const file = uploadInput.files?.[0]
    if (file && file.type.startsWith("image/")) {
        processingUploadFile()
    } else {
        setStatus("Можно загружать только изображения")
        return false
    }
})

function processingUploadFile(file) {
    if (file) {
        const dropZoneData = new FormData()
        const xhr = new XMLHttpRequest()

        dropZoneData.append("file", file)

        xhr.open("POST", uploadUrl, true)

        xhr.send(dropZoneData)

        xhr.onload = function () {
            if (xhr.status == 200) {
                setStatus("Всё загружено")
            } else {
                setStatus("Oшибка загрузки")
            }
            HTMLElement.style.display = "none"
        }
    }
}

function processingDownloadFileWithFetch() {
    fetch(url, {
        method: "POST",
    }).then(async (res) => {
        const reader = res?.body?.getReader();
        while (true && reader) {
            const { value, done } = await reader?.read()
            console.log("value", value)
            if (done) break
            console.log("Received", value)
        }
    })
}