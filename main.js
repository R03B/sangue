let tavola = document.querySelector('#tavola');


fetch('data.json').then((response)=>response.json()).then((data)=>{
    
    data.sort(function(a, b){return a.id - b.id});
    
    function inseritore(dati) {
        tavola.innerHTML=``
        dati.forEach(el => {
            let tr = document.createElement('tr')
            tr.innerHTML=`
            <th>${el.id}</th>
            <th>${el.type}</th>
            <th>${el.rh_factor}</th>
            `
            tavola.appendChild(tr)
        });
    }
    inseritore(data);
    
    
    let rh = document.querySelectorAll('.rh')
    
    function rhFilter(array) {
        // console.log(radios);
        let checked = Array.from(rh).find((button)=>button.checked)
        console.log(checked.id);
        if (checked.id=='rhALL') {
            return array;
        }else{
            console.log(array);
            console.log(array.filter((el)=>el.rh_factor==checked.value));
            return array.filter((el)=>el.rh_factor==checked.value);
        }
    }
    
    let type = document.querySelectorAll('.type')

    function typeFilter(array) {
        // console.log(radios);
        let checked = Array.from(type).find((button)=>button.checked)
        console.log(checked.id);
        if (checked.id=='typeALL') {
            return array;
        }else{
            return array.filter((el)=>el.type==checked.id);
        }
    }
    
    function globalFilter(start){return typeFilter(rhFilter(start)) }
    
    
    function click(radios,dati) {
        let radio = document.querySelector(`#${radios}`)
        radio.addEventListener('click',()=>{
            console.log('click');
            
            inseritore(globalFilter(dati))
        })
    }
    
    click('rhALL',data)
    click('più',data)
    click('meno',data)
    click('typeALL',data)
    click('A',data)
    click('B',data)
    click('AB',data)
    click('O',data)
})