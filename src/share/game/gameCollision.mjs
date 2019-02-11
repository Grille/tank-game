
function normalize(vec) {
  for (let i = 0; i < vec.length; i += 2) {
    let length = Math.sqrt((vec[i] * vec[i]) + (vec[i + 1] * vec[i + 1]))
    vec[i + 0] /= length;
    vec[i + 1] /= length;
  }
  return vec
}
function getEdges(poly){
  let edges = [];
  for (let i = 0;i<poly.length-2;i+=2){
    edges[i] = poly[i]-poly[i+2];
    edges[i+1] = poly[i+1]-poly[i+3];
  }
  edges[poly.length-2] = poly[poly.length-2]-poly[0];
  edges[poly.length-1] = poly[poly.length-1]-poly[1];
  return edges;


}
function projectPolygon(axis,poly){
  let min = (axis[0] * poly[0] + axis[1] * poly[1])
  let max = min;
  for (let i = 0; i < poly.length; i += 2) {
    let dotProduct = (axis[0] * poly[i] + axis[1] * poly[i + 1])
    if (dotProduct < min)
      min = dotProduct
    else if (dotProduct > max)
      max = dotProduct;
  }
  return {max:max,min:min}
}
function intervalDistance(proj1,proj2){
  if (proj1.min < proj2.min)
    return proj2.min - proj1.max;
  else
    return proj1.min - proj2.max;
}

export function polygonCollision(poly1,poly2){
  let edges = [];
  let poly1Edge = getEdges(poly1);
  for (let i = 0; i < poly1Edge.length; i++)
  edges[i] = poly1Edge[i];
  let poly2Edge = getEdges(poly2);
  for (let i = 0; i < poly2Edge.length; i++)
  edges[poly1Edge.length + i] = poly2Edge[i];

  for (let i = 0;i<edges.length;i+=2){
    let edge = [edges[i], edges[i+1]]
    let axis = normalize([-edge[1],edge[0]])
    let proj1 = projectPolygon(axis, poly1);
    let proj2 = projectPolygon(axis, poly2);
    let distance = intervalDistance(proj1, proj2)
    if (distance >= 0) return false;
  }

  return true;
}

export function transformPolygon(poly,angle,location){
  let result = [];result.length = poly.length;
  let sin = Math.sin(angle * 3.14159265 / 180), cos = Math.cos(angle * 3.14159265 / 180);
  for (let i = 0;i<poly.length;i+=2){
    let x = i,y=i+1;
    result[x] = poly[x];
    result[y] = poly[y];
    let resux = result[x] * cos - result[y] * sin;
    result[y] = result[x] * sin + result[y] * cos;
    result[x] = resux;
    result[x] += location.x;
    result[y] += location.y;
  }
  return result;
}

export function entityColision(entity1, entity2) {

  if (entity1 == null || entity2 == null) return false;
  let bounding = entity1.bounding + entity2.bounding;
  let boundingCollide = (Math.abs(entity1.location.x - entity2.location.x) <= bounding) && (Math.abs(entity1.location.y - entity2.location.y) <= bounding);
  //let boundingCollide = ((entity2.location.x - entity1.location.x) ** 2 + (entity1.location.y - entity2.location.y) ** 2) <= bounding ** 2
  if (boundingCollide) {
    let poly1 = this.transformPolygon(entity1.collision, entity1.angle, entity1.location);
    let poly2 = this.transformPolygon(entity2.collision, entity2.angle, entity2.location);
    return this.polygonCollision(poly1, poly2);
  }
  return false;
}




