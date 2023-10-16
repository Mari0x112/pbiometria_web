<?php

// OBTENER MEDICIONES

// Comprobar si existe una petición al recurso
if (!isset($peticion)) {
    http_response_code(500);
    die();
}

// Incluir el archivo de conexion de la bbdd
require_once 'includes/connection.php';
// Si falla la conexión, cancelar la operación
if (!isset($connexion)) die();

// Sentencia SQL para la bbdd
$sql = "SELECT *
        FROM `mediciones`";

// Devolver los valores resultado de la consulta
// Si hay parámetros en el path, ejecuta la consulta para obtener parámetros específicos a ese recurso
if(count($peticion->parametrosPath()) > 0){
    $id_sensor = intval($peticion->parametrosPath()[0]);
    $result = mysqli_query($connexion, $sql. " WHERE `mediciones`.`ID_sensor` = $id_sensor");
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;
    }
} else {
    $result = mysqli_query($connexion, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $salida[] = $row;
    }
}