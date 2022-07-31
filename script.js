// matrix containers
let matrixA = document.getElementById("matrixAContainer")
let matrixB = document.getElementById("matrixBContainer")

// inputs values
let matrixARows, matrixAColumns, matrixBRows, matrixBColumns

// button
let calcButton = document.getElementById("calcButton")

// result container
let results = document.getElementById("results")

function resetMatrixInputs()
{
    matrixA.innerHTML = ""
    matrixB.innerHTML = ""
    calcButton.style.visibility = "hidden"
    results.innerHTML = ""
}

// fetch matrix dimensions to draw them
function getMatrixParams()
{
    matrixARows = document.getElementById("matrixARows").value
    matrixAColumns = document.getElementById("matrixAColumns").value
    matrixBRows = matrixAColumns
    document.getElementById("matrixBRows").value = matrixBRows
    matrixBColumns = document.getElementById("matrixBColumns").value
}

function drawMatrixRows(matrixContainer, id, m, n)
{	
    matrixContainer.innerHTML = "<h3>Matrix " + id + "</h3>"

    for(let i = 1; i <= m; i++)
    {
        for(let j = 1; j <= n; j++)
        {
            matrixContainer.innerHTML += "<input type='text' id='" + id + i + "x" + j + "'>"
        }

        matrixContainer.innerHTML += "<br>"
    }
}

function showCalcButton()
{
    document.getElementById("calcButton").style.visibility = "visible"
}

function showMatrix(matrix)
{
    if(matrix == null)
        return

    for(let i = 1; i < matrix.length; i++)
    {
        for(let j = 1; j < matrix[1].length; j++)
        {
            results.innerHTML += "<input type='text' value='" + matrix[i][j] + "' disabled>"
        }
        
        results.innerHTML += "<br>"
    }
}

function matrixMultiply(matrixA, matrixB)
{
    let resultMatrixArray = []
    for(let i = 1; i < matrixA.length; i++)
    {
        resultMatrixArray[i] = []
        for(let j = 1; j < matrixB[1].length; j++)
        {
            resultMatrixArray[i][j] = 0

            for(let u = 1; u < matrixB.length; u++)
            {
                resultMatrixArray[i][j] += matrixA[i][u] * matrixB[u][j]
            }
        }
    }
    
    return resultMatrixArray
}

function fetchMatrix(id, m, n)
{
    let matrix = []
    for(let i = 1; i <= m; i++)
    {
        matrix[i] = [];
        for(let j = 1; j <= n; j++)
        {
            let valueFromRow = document.getElementById(id + i + "x" + j).value
            if(valueFromRow !== "" && !isNaN(valueFromRow))
            {
                matrix[i][j] = valueFromRow
            }
            else
            {
                results.innerHTML += "<h1 style='color: red'>Matrix " + id + " is not valid</h1>"
                return null
            }
        }
    }

    return matrix
}


function updateRows()
{
    resetMatrixInputs()
    getMatrixParams()

    if(matrixARows > 0 && matrixAColumns > 0)
        drawMatrixRows(matrixA, "A", matrixARows, matrixAColumns)

    if(matrixBRows > 0 && matrixBColumns > 0)
        drawMatrixRows(matrixB, "B", matrixBRows, matrixBColumns)

    if(matrixARows > 0 && matrixAColumns > 0 && matrixBColumns > 0)
        showCalcButton()
}

function calculateMatrix()
{
    results.innerHTML = ""

    let matrixAArray = fetchMatrix("A", matrixARows, matrixAColumns)
    let matrixBArray = fetchMatrix("B", matrixBRows, matrixBColumns)
    let resultMatrix = matrixMultiply(matrixAArray, matrixBArray)

    if(matrixAArray != null && matrixBArray != null)
    {
        results.innerHTML = "<hr><h1>Multiplication results</h1>"
        showMatrix(resultMatrix)
    }
}