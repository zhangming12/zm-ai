export function indexOf(arr, property, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][property] === val) return i;
    }

    return -1; //if not found
}
export function findInArray(arr, property, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][property] === val) return arr[i];
    }
}

export function scaleFeaturePoints(featurePoints, scale) {
    if (!featurePoints) return;

    return featurePoints.map(point => {
        return {
            "x": point.x * scale,
            "y": point.y * scale,
            "label": point.label,
            "id": point.id
        };
    });
}

export function getPointToDraw(appConfig, position, container, canvasOffset) {
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
export function updateFeaturePointInStore(scale, labellingData, shapeId, pointid, position, newLabel) {
    var shape = getShape(shapeId, labellingData);
    var scale = scale;
    var featurePoints = shape.featurePoints;
    var index = indexOf(featurePoints, "id", pointid);

    if (position) {
        featurePoints[index].x = position.cx * scale;
        featurePoints[index].y = position.cy * scale;
    }

    if (newLabel) {
        featurePoints[index].label = newLabel
    }
}
export function getShape(shapeId, labellingData) {
    // console.log
    return findInArray(labellingData.shapes, "id", shapeId);
}
export function updateShapeDetailInStore(scale, shapeId, bbox, points, labellingData) {
    var shapes = labellingData.shapes;
    var shape = getShape(shapeId, labellingData);
    var index = indexOf(shapes, "id", shapeId);
    var scale = 1 / scale;
    bbox && (shapes[index].bbox = scaleBbox(bbox, scale));
    points && (shapes[index].points = scaleShapePoints(points, scale, shape.type));
}
export function scaleBbox(bbox, scale) {
    return {
        'x': bbox.x * scale,
        'y': bbox.y * scale,
        'cx': (bbox.cx || 0) * scale,
        'cy': (bbox.cy || 0) * scale,
        'w': bbox.w * scale,
        'h': bbox.h * scale,
        'width': bbox.w * scale,
        'height': bbox.h * scale
    }
}
export function scaleShapePoints(points, scale, type) {
    if (!points) return;

    if (type == "polygon") {
        return points.map(point => {
            return point.map(val => val * scale);
        });
    }
    // Return this for other shapes
    return points.map(point => point * scale);
}

export function attachShapeToImg(scale, id, type, bbox, points, labellingData) {
    var shape = scaleShape(id, type, bbox, points,
        1 / scale
    );
    labellingData.shapes.push(shape);
    return shape;
}

export function scaleShape(id, type, bbox, points, scale) {
    return {
        "id": id,
        "label": "unlabelled",
        "type": type,
        "points": scaleShapePoints(points, scale, type),
        "bbox": scaleBbox(bbox, scale) || {
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
        },
        "attributes": [],
        "tags": [],
        "featurePoints": [],
        "zoomScale": 1,
        // "defaultZoomScale": 1 / imgSelected.size.imageScale
        "defaultZoomScale": 1

    }
}

export let appConfig = {
    autosave: {
        syncingInterval: 10 * 1000, //10 seconds
        enable: true,
        deleteIfExported: true, //Mark the data as saved when exported as nimn format, and delte the copy from browser cache.
    },
    zoomStepSize: 0.1,
    featurePointColor: '#ee0000'
};
export function detachPoint(shapeId, pointid) {
    var shape = getShape(shapeId);
    var featurePoints = shape.featurePoints;
    var index = indexOf(featurePoints, "id", pointid);
    featurePoints.splice(index, 1);
}
//删除某一个标注
export function detachShape(labellingData, shapeId) {
    var shapes = labellingData.shapes;
    var index = indexOf(shapes, "id", shapeId);
    shapes.splice(index, 1);
}
export function attachPointToShape(scale, shapeId, pointid, position) {
    var shape = getShape(shapeId);
    var scale = 1 / scale;
    shape.featurePoints.push({
        "x": position.cx * scale,
        "y": position.cy * scale,
        "label": shape.featurePoints.length,
        "id": pointid
    });
}
export function imgNameOpt(name) {
    let str = ''
    if (!name) return ""
    let arr = name.split('.');
    let aa = arr[arr.length - 1];
    str = name.substring(0, 3) + '***.jpg';
    return str
}