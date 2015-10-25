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

    return (new Vector4f(x, y, z, 0));
};

Vector4f.prototype.add = function (vector_1, vector_2) {
    var x = vector_1.x + vector_2.x;
    var y = vector_1.y + vector_2.y;
    var z = vector_1.z + vector_2.z;

    return (new Vector4f(x, y, z, 0));
};

Vector4f.prototype.product_scalar = function (vector, value) {
    var x = value * vector.x;
    var y = value * vector.y;
    var z = value * vector.z;

    return (new Vector4f(x, y, z, 0));
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

    return (new Vector4f(x, y, z, 0));
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

    return (new Vector4f(x, y, z, 0));
};

Vector4f.prototype.project = function (vector_1, vector_2) {
    var factor = Vector4f.prototype.product_dot(vector_1, vector_2);
    var length = Math.pow(Vector4f.prototype.length(vector_2), 2);
    var scalar = factor / length;

    return (Vector4f.prototype.scale(vector_2, scalar));
};

Vector4f.prototype.angle_cos = function (vector_1, vector_2) {
    var product = this.product_dot(vector_1, vector_2);
    var lngth_1 = Vector4f.prototype.length(vector_1);
    var lngth_2 = Vector4f.prototype.length(vector_2);

    return (Math.acos(product / (lngth_1 * lngth_2)));
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
    var a, b, c, d, x, y, z, w, t;

    t = Matrix4f.prototype.transpose(matrix_1);

    x = Vector4f.prototype.product_dot_xyzw(t.v1, matrix_2.v1);
    y = Vector4f.prototype.product_dot_xyzw(t.v2, matrix_2.v1);
    z = Vector4f.prototype.product_dot_xyzw(t.v3, matrix_2.v1);
    w = Vector4f.prototype.product_dot_xyzw(t.v4, matrix_2.v1);
    a = new Vector4f(x, y, z, w);

    x = Vector4f.prototype.product_dot_xyzw(t.v1, matrix_2.v2);
    y = Vector4f.prototype.product_dot_xyzw(t.v2, matrix_2.v2);
    z = Vector4f.prototype.product_dot_xyzw(t.v3, matrix_2.v2);
    w = Vector4f.prototype.product_dot_xyzw(t.v4, matrix_2.v2);
    b = new Vector4f(x, y, z, w);

    x = Vector4f.prototype.product_dot_xyzw(t.v1, matrix_2.v3);
    y = Vector4f.prototype.product_dot_xyzw(t.v2, matrix_2.v3);
    z = Vector4f.prototype.product_dot_xyzw(t.v3, matrix_2.v3);
    w = Vector4f.prototype.product_dot_xyzw(t.v4, matrix_2.v3);
    c = new Vector4f(x, y, z, w);

    x = Vector4f.prototype.product_dot_xyzw(t.v1, matrix_2.v4);
    y = Vector4f.prototype.product_dot_xyzw(t.v2, matrix_2.v4);
    z = Vector4f.prototype.product_dot_xyzw(t.v3, matrix_2.v4);
    w = Vector4f.prototype.product_dot_xyzw(t.v4, matrix_2.v4);
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
    var t = Matrix4f.prototype.transpose(matrix);

    Vector4f.prototype.display(t.v1);
    Vector4f.prototype.display(t.v2);
    Vector4f.prototype.display(t.v3);
    Vector4f.prototype.display(t.v4);
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

    this.matrix  = Matrix4f.prototype.multiply_matrix(this.matrix, new Matrix4f(x, y, z, w));
};

Transformation.prototype.scale = function (vector) {
    var x = new Vector4f(vector.x, 0, 0, 0);
    var y = new Vector4f(0, vector.y, 0, 0);
    var z = new Vector4f(0, 0, vector.z, 0);
    var w = new Vector4f(0, 0, 0, 1);

    this.matrix  = Matrix4f.prototype.multiply_matrix(this.matrix, new Matrix4f(x, y, z, w));
};

Transformation.prototype.rotate_x = function (value) {
    var x = new Vector4f(1, 0, 0, 0);
    var y = new Vector4f(0,  Math.cos(value), Math.sin(value), 0);
    var z = new Vector4f(0, -Math.sin(value), Math.cos(value), 0);
    var w = new Vector4f(0, 0, 0, 1);

    this.matrix  = Matrix4f.prototype.multiply_matrix(this.matrix, new Matrix4f(x, y, z, w));
};

Transformation.prototype.rotate_y = function (value) {
    var x = new Vector4f(Math.cos(value), 0, -Math.sin(value), 0);
    var y = new Vector4f(0, 1, 0, 0);
    var z = new Vector4f(Math.sin(value), 0,  Math.cos(value), 0);
    var w = new Vector4f(0, 0, 0, 1);

    this.matrix  = Matrix4f.prototype.multiply_matrix(this.matrix, new Matrix4f(x, y, z, w));
};

Transformation.prototype.rotate_z = function (value) {
    var x = new Vector4f( Math.cos(value), Math.sin(value), 0, 0);
    var y = new Vector4f(-Math.sin(value), Math.cos(value), 0, 0);
    var z = new Vector4f(0, 0, 1, 0);
    var w = new Vector4f(0, 0, 0, 1);

    this.matrix  = Matrix4f.prototype.multiply_matrix(this.matrix, new Matrix4f(x, y, z, w));
};

Transformation.prototype.display = function () {
    Matrix4f.prototype.display(this.matrix);
};


//****************************************************************************//

function Create_Transformation (trans) {
    trans.translate(new Vector4f(1.25, 0.00, 0.00, 1.00));
    trans.rotate_x(Math.PI / 3);
    trans.translate(new Vector4f(0.00, 0.00, 4.15, 1.00));
    trans.translate(new Vector4f(0.00, 3.14, 0.00, 1.00));
    trans.scale(new Vector4f(1.12, 1.12, 1.00, 1.00));
    trans.rotate_y(5 * Math.PI / 8);

    return trans;
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
                List_Of_Ins_Vectors.push(new Vector4f(Chars[1], Chars[2], Chars[3], 1));
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
    var TR, TM;

    x = new Vector4f(1, 0, 0, 0);
    y = new Vector4f(0, 1, 0, 0);
    z = new Vector4f(0, 0, 1, 0);
    w = new Vector4f(0, 0, 0, 1);

    TR = new Transformation(new Matrix4f(x, y, z, w));
    TR = Create_Transformation(TR);
    TM = Matrix4f.prototype.transpose(TR.matrix);

    List_Of_Mat_Vectors.push(TM.v1);
    List_Of_Mat_Vectors.push(TM.v2);
    List_Of_Mat_Vectors.push(TM.v3);
    List_Of_Mat_Vectors.push(TM.v4);

    for (var Index = 0; Index < List_Of_Ins_Vectors.length; Index++) {
        List_Of_Out_Vectors.push(Matrix4f.prototype.multiply_vector(TR.matrix, List_Of_Ins_Vectors[Index]));
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