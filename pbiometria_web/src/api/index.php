<?php

// Validar que el usuario esté identificado para rechazar
// solicitudes carentes de permiso
session_start();

// A falta de login en Android se mantiene comentado
/*if(!isset($_SESSION['user'])) {
    http_response_code(401);
    die();
}*/

// Incluir el archivo para procesar solicitudes REST
require_once 'includes/PeticionREST.inc';

$peticion = new PeticionREST('api');

$recurso = $peticion->recurso();

$metodo = strtolower($peticion->metodo());

$salida = [];

// Archivo a importar según el recurso solicitado
$file = "recursos/$recurso.$metodo.inc";

// Comprobar que existe, si no, devolver error 400
if(!file_exists($file)) {
    http_response_code(400);
    die();
}

// Importar el archivo
require_once $file;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($salida);