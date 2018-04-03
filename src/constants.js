module.exports = `
SELECT
	prog_codigo,
	prog_nombre,
	prog_version,
	CASE WHEN prog_web=true THEN 'Web' ELSE 'Desktop' END AS prog_type,
	CASE WHEN prog_desarrollador ='0' THEN 'Not asigned' ELSE (
    SELECT usua_nombre FROM seguridad.usuario WHERE usua_documento = prog_desarrollador LIMIT 1
  ) END AS prg_desarrollador
FROM
	seguridad.programa
WHERE prog_codigo = $1
LIMIT 1`;
