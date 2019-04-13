export let tools = {
    labelling: {
        // "tool-point": {
        //     type: "point",
        //     title: "Point",
        //     id:"tool-point",
        //     desp: "Create a feature point inside the concave polygon or boundary box",
        //     icon: "point.svg",
        //     drawable: true,
        //     actions: ["landmark", "colorpicker"],
        //     create: function (e, container) {
        //         var canvasOffset = myCanvas.node.getBoundingClientRect();
        //         return getPointToDraw(e, container, canvasOffset);
        //     },
        //     validate: function (el) {
        //         return true;
        //     }
        // },
        // "tool-circle": {
        //     type: "circle",
        //     title: "Circle",
        //     id:"tool-circle",
        //     desp: "Create a circle",
        //     icon: "circle.svg",
        //     drawable: true,
        //     create (myCanvas) {
        //         var circle = myCanvas.nested().circle().radius().addClass('labelcircle shape')/* .draw() */;
        //         circle.resize();
        //         circle.parent().draggable();
        //         return circle;
        //     },
        //     validate: function (el) {
        //         return Number.parseInt(el.attr("r")) > 3;
        //     }
        // },
        "tool-rectangle": {
            type: "rect",
            title: "Rectangle",
            id: "tool-rectangle",
            desp: "Create a Boundary boxrectangle",
            icon: "rectangle.svg",
            drawable: true,
            create(myCanvas, maxX, maxY) {
                var rect = myCanvas.nested().rect().addClass('labelbox shape') /* .draw() */ ;
                rect.resize();
                rect.draggable({
                    minX: 0,
                    minY: 0,
                    maxX,
                    maxY
                });
                return rect;
            },
            validate(el) {
                return Number.parseInt(el.attr("width")) > 3;
            },
        },
        "tool-polygon": {
            type: "poly",
            title: "Polygon",
            id: "tool-polygon",
            desp: "Create a concave polygon",
            icon: "polygon.svg",
            drawable: true,
            create(myCanvas) { //TODO: bug: creating duplicate points
                var poly = myCanvas.nested().polygon().addClass('labelpolygon shape') /* .draw() */ ;
                poly.resize();
                poly.parent().draggable();

                poly.on('drawstart', function(e) {
                    document.addEventListener('keydown', function(e) {
                        if (e.keyCode == 13) {
                            poly.draw('done');
                            poly.off('drawstart');
                        }
                    });
                });

                return poly;
            },
            validate: function(el) {
                return true;
            },
        }
    },
    canvas: {
        "tool-move": {
            title: "Move",
            id: "tool-move",
            desp: "Move an element or the entire workarea",
            icon: "move.svg",
            type: "move",
        }
    }
};


function getPointToDraw(position, container, canvasOffset) {
    // Get the parent svg element that surrounds the container
    var parentSvg = $('#' + container.node.id).closest('svg');
    var containerOffset = {
            x: parseInt(parentSvg.attr("x"), 10) || 0,
            y: parseInt(parentSvg.attr("y"), 10) || 0
        }
        // Feature point size should be local to each image
    var featurePointSize = labellingData[imgSelected.name].featurePointSize;
    var point = container.parent().circle()
        .radius(Math.floor(featurePointSize))
        .attr({
            cx: position.x - canvasOffset.x - containerOffset.x,
            cy: position.y - canvasOffset.y - containerOffset.y
        })
        .addClass('labelpoint');
    // Set feature point colors with appConfig.featurePointColor
    $('.labelpoint').css('fill', appConfig.featurePointColor);
    point.draggable();
    return point;
}

// export let funTool = [
//     {
//         icon:{
//             icon
//         }
//     }
// ]