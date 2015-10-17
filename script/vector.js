function Vector4f (x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}

Vector4f.prototype.negate = function (vector) {
    var x = 0 - vector.x;
    var y = 0 - vector.y;
    var z = 0 - vector.z;
    var w = 1;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.add = function (vector_1, vector_2) {
    var x = vector_1.x + vector_2.x;
    var y = vector_1.y + vector_2.y;
    var z = vector_1.z + vector_2.z;
    var w = 1;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.product_scalar = function (vector, value) {
    var x = value * vector.x;
    var y = value * vector.y;
    var z = value * vector.z;
    var w = 1;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.product_dot = function (vector_1, vector_2) {
    var x = vector_1.x * vector_2.x;
    var y = vector_1.y * vector_2.y;
    var z = vector_1.z * vector_2.z;

    return (x + y + z);
};

Vector4f.prototype.product_cross = function (vector_1, vector_2) {
    var x = vector_1.y * vector_2.z - vector_1.z * vector_2.y;
    var y = vector_1.z * vector_2.x - vector_1.x * vector_2.z;
    var z = vector_1.x * vector_2.y - vector_1.y * vector_2.x;
    var w = 1;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.length = function (vector) {
    var x = vector.x * vector.x;
    var y = vector.y * vector.y;
    var z = vector.z * vector.z;

    return (Math.sqrt(x + y + z));
};

Vector4f.prototype.normalize = function (vector) {
    var length = Vector4f.prototype.length(vector);
    var x = vector.x / length;
    var y = vector.y / length;
    var z = vector.z / length;
    var w = 1;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.project = function (vector_1, vector_2) {
    var product = Vector4f.prototype.product_dot(vector_1, vector_2);
    var length = Math.pow(Vector4f.prototype.length(vector_2), 2);
    var scalar = product / length;

    return (Vector4f.prototype.scale(vector_2, scalar));
};

Vector4f.prototype.angle_cos = function (vector_1, vector_2) {
    var dot = this.product_dot(vector_1, vector_2);
    var length_1 = Vector4f.prototype.length(vector_1);
    var length_2 = Vector4f.prototype.length(vector_2);

    return (Math.acos(dot / (length_1 * length_2)));
};

Vector4f.prototype.display = function (vector) {
    console.log(vector.x + " " + vector.y + " " + vector.z + " " + vector.w);
};