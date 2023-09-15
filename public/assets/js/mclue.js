const state = new State()

document.addEventListener('DOMContentLoaded', event => {
    "use strict";$(function(){var e=$(".selectpicker"),t=$(".form-select"),i=$(".form-select-icons");function l(e){return e.id?"<i class='bx bxl-"+$(e.element).data("icon")+" me-2'></i>"+e.text:e.text}e.length&&e.selectpicker(),t.length&&t.each(function(){var e=$(this);e.select2({dropdownParent:e.parent()})}),i.length&&i.wrap('<div class="position-relative"></div>').select2({templateResult:l,templateSelection:l,escapeMarkup:function(e){return e}})});
})

sendRequest = async (method, url, data, isJson = true) => {
    if (method === 'GET') {
        var request = await fetch(url, {
            headers: {
                isFetch: true
            }
        })
    }
    else {
        var request = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(data)
        })
    }
    
    return isJson ? request.json() : request.text()
}

appendSelectOption = (id, data, selectName, props = false) => {
    const attributeSelect = document.getElementById(id)
    attributeSelect.innerText = null
    attributeSelect.innerHTML = data.length >= 1 ? `<option value="" disabled selected>-- Choose ${selectName} --</option>` : `<option value="" disabled selected>-- Data ${selectName} empty --</option>`
    data.forEach((item) => {
        const firstObj  = Object.keys(item)[0]
        const secondObj = Object.keys(item)[1]
        const option = document.createElement(`option`)
        option.value = item[firstObj]
        option.text = item[secondObj]
        if (props) {
            option.setAttribute('data-key', props)
        }
        attributeSelect.add(option)
    })
}

modal = (id, option = {}, prop = 'open') => {
    if (state.events.modal) state.events.modal.hide()
    
    if (!state.events.modal || prop === 'open') {
        const elModal = new bootstrap.Modal(document.getElementById(id), option)
        state.events = {...state.events, modal: elModal}
    }
    
    switch (prop) {
        case 'open':
            state.events.modal.show()
            break;
        case 'toggle':
            state.events.modal.toggle()
            break;
        default:
            break;
    }
}

setInnerHtml = (elm, html) => {
    elm.innerHTML = '';
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

makeAnEvent = (eventType, elementId) => {
    const event = new Event(eventType)
    const elId = document.getElementById(elementId)
    elId.dispatchEvent(event)
}

getCurrentLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates, showError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    } else {
        alert(`Geolocation is not supported by this browser`)
    }
}

getCoordinates = async position => {
    const coordinates = await position
    state.events = {...state.events, coordinates: coordinates}
}

showError = error => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert(`User denied the request for Geolocation`)
            break
        case error.POSITION_UNAVAILABLE:
            alert(`Location information is unavailable`)
            break
        case error.TIMEOUT:
            alert(`The request to get user location timed out`)
            break
        case error.UNKNOWN_ERROR:
            alert(`An unknown error occurred`)
            break
    }
}

tableJson = async (id, callback) => {
    const table = document.getElementById(id)
    const tableTbody = table.getElementsByTagName('tbody')[0]
    while(tableTbody.hasChildNodes())
    {
        tableTbody.removeChild(tableTbody.firstChild);
    }        
    await callback(tableTbody)
    
    const tableTbodyRow = tableTbody.getElementsByTagName('tr').length
    if (tableTbodyRow < 1) {
        const tableThead = table.getElementsByTagName('thead')[0].getElementsByTagName('tr')
        tableTbody.insertRow().innerHTML = `
            <td colspan="${tableThead[0].cells.length}" class="text-center">Data Kosong</td>
        `
    }
}

pagination = (id, pagination, callback) => {
    document.getElementById(id).innerHTML = pagination
    const elPagination = document.querySelectorAll(`#${id} .pagination .page-item`)
    elPagination.forEach((el, i) => {
        el.addEventListener("click", (event) => {
            if (event.target.href !== undefined) callback(event.target.href)
            event.preventDefault()
        })
    })
}

momentFormat = (date, currentFormat, toFormat, empty = '-') => {
    return (date && date !== null && date.trim() !== "") ? moment(date, currentFormat).format(toFormat) : empty
}