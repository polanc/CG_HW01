//****************************************************************************//

var Error_Check = 0;

//****************************************************************************//

var List_Of_Ins_Vectors = [];
var List_Of_Out_Vectors = [];
var List_Of_Mat_Vectors = [];

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
    var w = 0;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.add = function (vector_1, vector_2) {
    var x = vector_1.x + vector_2.x;
    var y = vector_1.y + vector_2.y;
    var z = vector_1.z + vector_2.z;
    var w = 0;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.product_scalar = function (vector, value) {
    var x = value * vector.x;
    var y = value * vector.y;
    var z = value * vector.z;
    var w = 0;

    return (new Vector4f(x, y, z, w));
};

Vector4f.prototype.product_dot_xyz = function (vector_1, vector_2) {
    var x = vector_1.x * vector_2.x;
    var y = vector_1.y * vector_2.y;
    var z = vector_1.z * vector_2.z;

    return (x + y + z);
};

Vector4f.prototype.product_dot_xyzw = function (vector_1, vector_2) {
    var x = vector_1.x * vector_2.x;
    var y = vector_1.y * vector_2.y;
    var z = vector_1.z * vector_2.z;
    var w = vector_1.w * vector_2.w;

    return (x + y + z + w);
};

Vector4f.prototype.product_cross = function (vector_1, vector_2) {
    var x = vector_1.y * vector_2.z - vector_1.z * vector_2.y;
    var y = vector_1.z * vector_2.x - vector_1.x * vector_2.z;
    var z = vector_1.x * vector_2.y - vector_1.y * vector_2.x;
    var w = 0;

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
    var w = 0;

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
    var vec_1 = matrix.v1;
    var vec_2 = matrix.v2;
    var vec_3 = matrix.v3;
    var vec_4 = matrix.v4;

    var x = new Vector4f(vec_1.x, vec_2.x, vec_3.x, vec_4.x);
    var y = new Vector4f(vec_1.y, vec_2.y, vec_3.y, vec_4.y);
    var z = new Vector4f(vec_1.z, vec_2.z, vec_3.z, vec_4.z);
    var w = new Vector4f(vec_1.w, vec_2.w, vec_3.w, vec_4.w);

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
    var a, b, c, d;
    var x, y, z, w;

    x = Vector4f.prototype.product_dot_xyzw(transpose.v1, matrix_2.v1);
    y = Vector4f.prototype.product_dot_xyzw(transpose.v2, matrix_2.v1);
    z = Vector4f.prototype.product_dot_xyzw(transpose.v3, matrix_2.v1);
    w = Vector4f.prototype.product_dot_xyzw(transpose.v4, matrix_2.v1);
    a = new Vector4f(x, y, z, w);

    x = Vector4f.prototype.product_dot_xyzw(transpose.v1, matrix_2.v2);
    y = Vector4f.prototype.product_dot_xyzw(transpose.v2, matrix_2.v2);
    z = Vector4f.prototype.product_dot_xyzw(transpose.v3, matrix_2.v2);
    w = Vector4f.prototype.product_dot_xyzw(transpose.v4, matrix_2.v2);
    b = new Vector4f(x, y, z, w);

    x = Vector4f.prototype.product_dot_xyzw(transpose.v1, matrix_2.v3);
    y = Vector4f.prototype.product_dot_xyzw(transpose.v2, matrix_2.v3);
    z = Vector4f.prototype.product_dot_xyzw(transpose.v3, matrix_2.v3);
    w = Vector4f.prototype.product_dot_xyzw(transpose.v4, matrix_2.v3);
    c = new Vector4f(x, y, z, w);

    x = Vector4f.prototype.product_dot_xyzw(transpose.v1, matrix_2.v4);
    y = Vector4f.prototype.product_dot_xyzw(transpose.v2, matrix_2.v4);
    z = Vector4f.prototype.product_dot_xyzw(transpose.v3, matrix_2.v4);
    w = Vector4f.prototype.product_dot_xyzw(transpose.v4, matrix_2.v4);
    d = new Vector4f(x, y, z, w);

    return (new Matrix4f(a, b, c, d));
};

Matrix4f.prototype.multiply_vector = function (matrix, vector) {
    var x = Vector4f.prototype.product_dot_xyzw(matrix.v1, vector);
    var y = Vector4f.prototype.product_dot_xyzw(matrix.v2, vector);
    var z = Vector4f.prototype.product_dot_xyzw(matrix.v3, vector);
    var w = Vector4f.prototype.product_dot_xyzw(matrix.v4, vector);

    return (new Vector4f(x, y, z, w));
};

Matrix4f.prototype.display = function (matrix) {
    var transpose = Matrix4f.prototype.transpose(matrix);

    Vector4f.prototype.display(transpose.v1);
    Vector4f.prototype.display(transpose.v2);
    Vector4f.prototype.display(transpose.v3);
    Vector4f.prototype.display(transpose.v4);
};

//****************************************************************************//

function Transformation (m) {
    this.matrix = m;
}

Transformation.prototype.translate = function (vector) {
    var x = new Vector4f(1, 0, 0, 0);
    var y = new Vector4f(0, 1, 0, 0);
    var z = new Vector4f(0, 0, 1, 0);
    var w = new Vector4f(vector.x, vector.y, vector.z, vector.w);

    var m = new Matrix4f(x, y, z, w);
    var t = this.matrix;

    this.matrix  = Matrix4f.prototype.multiply_matrix(t, m);
};

Transformation.prototype.scale = function (vector) {
    var x = new Vector4f(vector.x, 0, 0, 0);
    var y = new Vector4f(0, vector.y, 0, 0);
    var z = new Vector4f(0, 0, vector.z, 0);
    var w = new Vector4f(0, 0, 0, vector.w);

    var m = new Matrix4f(x, y, z, w);
    var t = this.matrix;

    this.matrix  = Matrix4f.prototype.multiply_matrix(t, m);
};

Transformation.prototype.rotate_x = function (value) {
    var x = new Vector4f(1, 0, 0, 0);
    var y = new Vector4f(0, Math.cos(value), Math.sin(value), 0);
    var z = new Vector4f(0, -Math.sin(value), Math.cos(value), 0);
    var w = new Vector4f(0, 0, 0, 1);

    var m = new Matrix4f(x, y, z, w);
    var t = this.matrix;

    this.matrix  = Matrix4f.prototype.multiply_matrix(t, m);
};

Transformation.prototype.rotate_y = function (value) {
    var x = new Vector4f(Math.cos(value), 0, -Math.sin(value), 0);
    var y = new Vector4f(0, 1, 0, 0);
    var z = new Vector4f(Math.sin(value), 0, Math.cos(value), 0);
    var w = new Vector4f(0, 0, 0, 1);

    var m = new Matrix4f(x, y, z, w);
    var t = this.matrix;

    this.matrix  = Matrix4f.prototype.multiply_matrix(t, m);
};

Transformation.prototype.rotate_z = function (value) {
    var x = new Vector4f(Math.cos(value), Math.sin(value), 0, 0);
    var y = new Vector4f(-Math.sin(value), Math.cos(value), 0, 0);
    var z = new Vector4f(0, 0, 1, 0);
    var w = new Vector4f(0, 0, 0, 1);

    var m = new Matrix4f(x, y, z, w);
    var t = this.matrix;

    this.matrix  = Matrix4f.prototype.multiply_matrix(t, m);
};

Transformation.prototype.display = function () {
    Matrix4f.prototype.display(this.matrix);
};


//****************************************************************************//

function Create_Transformation (matrix) {
    var a = new Vector4f(1.25, 0.00, 0.00, 1.00);
    var b = Math.PI / 3;
    var c = new Vector4f(0.00, 0.00, 4.15, 1.00);
    var d = new Vector4f(0.00, 3.14, 0.00, 1.00);
    var e = new Vector4f(1.12, 1.12, 1.00, 1.00);
    var f = 5 * Math.PI / 8;

    matrix.translate(a);
    matrix.rotate_x(b);
    matrix.translate(c);
    matrix.translate(d);
    matrix.scale(e);
    matrix.rotate_y(f);

    return matrix;
}

//****************************************************************************//

function PointManager () {
    Clean_Up();
    Get_Values();

    if (Error_Check == 0) { 
        Demonstrate();
        Set_Matrix();
        Set_Result();
    }

    Clean_Up();
}

//****************************************************************************//

function Get_Values () {
    var Total = document.getElementById("Text-Ins").value;
    var Lines = Total.split(/\n/);

    for (var Index = 0; Index < Lines.length; Index++) {
        var Chars = Lines[Index].split(/\s+/);

        if (Chars[0] != "v") {
            Error_Check = 1;
            alert("Input Missmatch At Line " + (Index + 1));
        }
        else {
            if (Is_Number(Chars[1]) && Is_Number(Chars[2]) && Is_Number(Chars[3])) {
                Error_Check = 0;
                var Vector = new Vector4f(Chars[1], Chars[2], Chars[3], 1);
                List_Of_Ins_Vectors.push(Vector);
            }
            else {
                Error_Check = 1;
                alert("Input Missmatch At Line " + (Index + 1));
            }
        }
    }
}

function Demonstrate () {
    var x, y, z, w;
    var ID, TR, TM;

    x = new Vector4f(1, 0, 0, 0);
    y = new Vector4f(0, 1, 0, 0);
    z = new Vector4f(0, 0, 1, 0);
    w = new Vector4f(0, 0, 0, 1);

    ID = new Matrix4f(x, y, z, w);
    TR = new Transformation(ID);
    TR = Create_Transformation(TR);
    TM = Matrix4f.prototype.transpose(TR.matrix);

    List_Of_Mat_Vectors.push(TM.v1);
    List_Of_Mat_Vectors.push(TM.v2);
    List_Of_Mat_Vectors.push(TM.v3);
    List_Of_Mat_Vectors.push(TM.v4);

    for (var Index = 0; Index < List_Of_Ins_Vectors.length; Index++) {
        var New_Vector = Matrix4f.prototype.multiply_vector(TR.matrix, List_Of_Ins_Vectors[Index]);
        List_Of_Out_Vectors.push(New_Vector);
    }
}

function Set_Matrix () {
    var Text = "";
    var Size = 3;

    for (var Index = 0; Index < List_Of_Mat_Vectors.length; Index++) {
        Text = Text + Decimals(List_Of_Mat_Vectors[Index].x, Size) + " " + Decimals(List_Of_Mat_Vectors[Index].y, Size) + " " + Decimals(List_Of_Mat_Vectors[Index].z, Size) + " " + Decimals(List_Of_Mat_Vectors[Index].w, Size) + "\n";
    }

    document.getElementById("Tran-Mat").value = Text;
}

function Set_Result () {
    var Text = "";
    var Size = 3;

    for (var Index = 0; Index < List_Of_Out_Vectors.length; Index++) {
        Text = Text + "v " + Decimals(List_Of_Out_Vectors[Index].x, Size) + " " + Decimals(List_Of_Out_Vectors[Index].y, Size) + " " + Decimals(List_Of_Out_Vectors[Index].z, Size) + "\n";
    }

    document.getElementById("Text-Out").value = Text;
}

//****************************************************************************//

function Decimals (value, size) {
    var Numb = parseFloat(Math.round(value * Math.pow(10, size)) / Math.pow(10, size)).toFixed(size);
    var Text = "";

    if (Numb >= 0) {
        Text = " " + Numb;
    }
    else {
        Text = Numb;
    }

    return Text;
}

function Is_Number (Number) {
    return !isNaN(parseFloat(Number)) && isFinite(Number);
}

function Clean_Up () {
    while(List_Of_Ins_Vectors.length > 0) {
        List_Of_Ins_Vectors.pop();
    }

    while(List_Of_Out_Vectors.length > 0) {
        List_Of_Out_Vectors.pop();
    }

    while(List_Of_Mat_Vectors.length > 0) {
        List_Of_Mat_Vectors.pop();
    }
}

//****************************************************************************//