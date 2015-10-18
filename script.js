//****************************************************************************//

var List_Of_Vectors = [];

//****************************************************************************//

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

//****************************************************************************//

function Matrix4f (v1, v2, v3, v4) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.v4 = v4;
}

Matrix4f.prototype.negate = function (matrix) {
    var x = Vector4f.prototype.negate(matrix.v1);
    var y = Vector4f.prototype.negate(matrix.v2);
    var z = Vector4f.prototype.negate(matrix.v3);
    var w = Vector4f.prototype.negate(matrix.v4);

    return (new Matrix4f(x, y, z, w));
};

Matrix4f.prototype.add = function (matrix_1, matrix_2) {
    var x = Vector4f.prototype.add(matrix_1.v1, matrix_2.v1);
    var y = Vector4f.prototype.add(matrix_1.v2, matrix_2.v2);
    var z = Vector4f.prototype.add(matrix_1.v3, matrix_2.v3);
    var w = Vector4f.prototype.add(matrix_1.v4, matrix_2.v4);

    return (new Matrix4f(x, y, z, w));
};

Matrix4f.prototype.transpose = function (matrix) {
    var x = new Vector4f(matrix.v1.x, matrix.v2.x, matrix.v3.x, matrix.v4.x);
    var y = new Vector4f(matrix.v1.y, matrix.v2.y, matrix.v3.y, matrix.v4.y);
    var z = new Vector4f(matrix.v1.z, matrix.v2.z, matrix.v3.z, matrix.v4.z);
    var w = new Vector4f(matrix.v1.w, matrix.v2.w, matrix.v3.w, matrix.v4.w);

    return (new Matrix4f(x, y, z, w));
};

Matrix4f.prototype.multiply_scalar = function (matrix, value) {
    var x = Vector4f.prototype.product_scalar(matrix.v1, value);
    var y = Vector4f.prototype.product_scalar(matrix.v2, value);
    var z = Vector4f.prototype.product_scalar(matrix.v3, value);
    var w = Vector4f.prototype.product_scalar(matrix.v4, value);

    return (new Matrix4f(x, y, z, w));
};

Matrix4f.prototype.multiply_matrix = function (matrix_1, matrix_2) {
    var transpose = Matrix4f.prototype.transpose(matrix_1);

    var x = Vector4f.prototype.product_dot(transpose.v1, matrix_2.v1);
    var y = Vector4f.prototype.product_dot(transpose.v2, matrix_2.v2);
    var z = Vector4f.prototype.product_dot(transpose.v3, matrix_2.v3);
    var w = Vector4f.prototype.product_dot(transpose.v4, matrix_2.v4);
    
    return (new Matrix4f(x, y, z, w));
};

Matrix4f.prototype.display = function (matrix) {
    var transpose = Matrix4f.prototype.transpose(matrix);

    Vector4f.prototype.display(transpose.v1);
    Vector4f.prototype.display(transpose.v2);
    Vector4f.prototype.display(transpose.v3);
    Vector4f.prototype.display(transpose.v4);
};

//****************************************************************************//

function Transformation (matrix) {
    this.matrix = matrix;
}

Transformation.prototype.translate = function (vector) {
    
};

Transformation.prototype.scale = function (vector) {
    
};

Transformation.prototype.rotate_x = function (value) {
    
};

Transformation.prototype.rotate_y = function (value) {
    
};

Transformation.prototype.rotate_z = function (value) {
    
};

//****************************************************************************//

function Transform () {
    Transformation.prototype.translate(1.25, 0, 0, 0);
    Transformation.prototype.rotate_x(Math.PI / 3);
    Transformation.prototype.translate(0, 0, 4.15, 0);
    Transformation.prototype.translate(0, 3.14, 0, 0);
    Transformation.prototype.scale(1.12, 1.12, 1, 1);
    Transformation.prototype.rotate_y(5 * Math.PI * 8);
}

//****************************************************************************//

function Get_Values () {
    var Total = document.getElementById("Text-Ins").value;
    var Lines = Total.split(/\n/);

    for (var Index = 0; Index < Lines.length; Index++) {
        var Chars = Lines[Index].split(/\s+/);

        if (Chars[0] != "v") {
            alert("Input Missmatch At Line " + (Index + 1));
        }
        else {
            if (Is_Number(Chars[1]) && Is_Number(Chars[2]) && Is_Number(Chars[3])) {
               var Vector = new Vector4f(Chars[1], Chars[2], Chars[3], 1);
               List_Of_Vectors.push(Vector);
            }
            else {
                alert("Input Missmatch At Line " + (Index + 1));
            }
        }
    }
}

function Is_Number (Number) {
    return !isNaN(parseFloat(Number)) && isFinite(Number);
}

function Set_Result () {
    var Text = "";

    for (var Index = 0; Index < List_Of_Vectors.length; Index++) {
        Text = Text + "v " + List_Of_Vectors[Index].x + " " + List_Of_Vectors[Index].y + " " + List_Of_Vectors[Index].z + "\n";
    }

    document.getElementById("Text-Out").value = Text;
}

//****************************************************************************//

function Demonstrate () {
    Get_Values();
    Set_Result();
}


//****************************************************************************//