var dragging
    layers = [],
    objects = [],
    numEle = 5,
    canvas = document.getElementById('canvas'),
    viewport = document.getElementById('viewport'),
    
    d = 0,
    p = 400,
    canvasXAngle = 0,
    canvasYAngle = 0;

viewport.style.webkitPerspective = p;
viewport.style.MozPerspective = p;
viewport.style.oPerspective = p;

generate(canvas);

function createSubElement(parentEle) {
    var div = document.createElement('div');
    div.className = 'base-element';
    var x = 256 - (Math.random() * 512);
    var y = 256 - (Math.random() * 512);
    var z = 256 - (Math.random() * 512);
    var t = 'translateX( ' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px)';
    div.style.webkitTransform = t;
    div.style.MozTransform = t;
    div.style.oTransform = t;
    parentEle.appendChild(div);
    
    for(var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++) {
        var layer = document.createElement('div');
        layer.className = 'base-element-layer';
        var element = document.createElement('div');
        element.className = 'element';
        
        var x = 256 - (Math.random() * 512);
        var y = 256 - (Math.random() * 512);
        var z = 100 - (Math.random() * 200);
        var a = Math.random() * 360;
        var s = .25 + Math.random();
        x *= .2; y *= .2;
        layer.data = { 
            x: x,
            y: y,
            z: z,
            a: a,
            s: s
        };
        var t = 'translateX(' + x + 'px) translateY(' + y + 'px ) translateZ(' + z + 'px) rotateZ(' + a + 'deg) scale(' + s + ')';
        layer.style.webkitTransform = t;
        layer.style.MozTransform = t;
        layer.style.oTransform = t;
    
        layer.appendChild(element);
        div.appendChild(layer);
        layers.push(layer);
    }
    
    return div;
}

viewport.addEventListener('mousewheel', onContainerMouseWheel);
viewport.addEventListener('mousedown', onContainerClick);
viewport.addEventListener('mouseup', onContainerClick);
window.addEventListener('DOMMouseScroll', onContainerMouseWheel); 
viewport.addEventListener('mousemove', function(e) {
    if(dragging){
        canvasYAngle = -(.5 - (e.clientX / e.currentTarget.clientWidth)) * 180;
        canvasXAngle = (.5 - (e.clientY / e.currentTarget.clientHeight)) * 180;
        updateView();
    }
} );

function generate(parentEle) {
    objects = [];
    if (parentEle.hasChildNodes()) {
        while (parentEle.childNodes.length >= 1) {
            parentEle.removeChild(parentEle.firstChild);       
        } 
    }
    for(var j = 0; j < numEle; j++) {
        objects.push(createSubElement(parentEle));
    }
}

function onContainerClick(e) {
    dragging = false;
    if(e.type === "mousedown"){
        dragging = true;
    }
}

function updateView() {
    var t = 'translateZ(' + d + 'px) rotateX(' + canvasXAngle + 'deg) rotateY(' + canvasYAngle + 'deg)';
    canvas.style.webkitTransform = t;
    canvas.style.MozTransform = t;
    canvas.style.oTransform = t;
}

function onContainerMouseWheel(e) {
    e = e ? e : window.e;
    d = d - (e.detail ? e.detail * -5 : e.wheelDelta / 8);
    updateView();
    
}


/*full 3d*/
/*function update (){
    
    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) translateY( ' + layer.data.y + 'px ) translateZ( ' + layer.data.z + 'px ) rotateY( ' + ( - canvasYAngle ) + 'deg ) rotateX( ' + ( - canvasXAngle ) + 'deg ) scale( ' + layer.data.s + ')';
        layer.style.webkitTransform = t;
        layer.style.MozTransform = t;
        layer.style.oTransform = t;
    }
    
    requestAnimationFrame( update );
    
}

update();*/
/*full 3d*/