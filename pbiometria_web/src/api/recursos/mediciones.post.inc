<?php

// PUBLICAR MEDICION

// Comprobar si existe una petición al recurso
if (!isset($peticion)) {
    http_response_code(500);
    die();
}

// Incluir el archivo de conexion de la bbdd
require_once 'includes/connection.php';
// Si falla la conexión, cancelar la operación
if (!isset($connexion)) die();

// Variables que almacenan los valores a publicar
$temperatura = $peticion->parametrosPost()['temperatura'];
$ppmO3 = $peticion->parametrosPost()['ppmO3'];

// Sentencia SQL para la bbdd
$sql = "INSERT INTO `mediciones` (`ID`, `ID_sensor`, `date`, `ppmO3`, `temp`, `lat`, `lon`)
        VALUES (NULL, '3', '2023-10-16', '$ppmO3', '$temperatura', '0', '0')";

// Sentencia TRY - CATCH para resolver errores en caso de fallo al publicar
try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    die(mysqli_errno($connexion));
}