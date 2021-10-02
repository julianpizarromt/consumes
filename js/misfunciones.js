function listarCostumes(){
    $.ajax({
        url:'https://gbe31928932c95e-db202109232118.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costumes/costumes/',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#listado").empty();
            pintarListadoCostumes(respuesta.items);
        }
    });
}

function pintarListadoCostumes(items){
    let myTable = `<table>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>Acción </th>
                     </tr>`;

    for(i=0;i<items.length; i++){
        myTable += "<tr>";
        myTable += "<td>"+items[i].id+"</td>";
        myTable += "<td>"+items[i].name+"</td>";
        myTable += "<td>"+items[i].brand+"</td>";
        myTable += "<td>"+items[i].model+"</td>";
        myTable += "<td><button onclick='eliminarCostumes("+items[i].id+")'>Eliminar</button></td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#listado").append(myTable);
}
function registrarCostumes(){
    let myData= {
        //id: $("#id").val(),
        name: $("#name").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id:$("#category").val()
    };
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:"https://gbe31928932c95e-db202109232118.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costumes/costumes/",
        type:"POST",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            console.log(respuesta);
            $("#mensaje").show(1000);
            $("#mensaje").html("costumes guardado!");
           $("#id").val("");
            $("#name").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category").val("");
            listarCostumes();
            $("#mensaje").hide(1000);
            $("#mensaje").empty();

        },error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST... " + status );
            //$("#mensajes").hide(1000);
        }
    });
}

function eliminarCostumes(idC){
     let mydata={
        id:idC
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:"https://gbe31928932c95e-db202109232118.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/costumes/costumes/",
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            console.log(respuesta);
            
            listarCostumes();
           

        }
    });

}