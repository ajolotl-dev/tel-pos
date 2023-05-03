const { ipcMain } = require('electron');
const pool = require('./connection');


ipcMain.handle('search-user', async (event, usuario) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM usuarios WHERE user = ? AND password = ?', [usuario.user, usuario.password]);
    if(rows[0]){
      return rows[0]; // Retorna el primer registro encontrado
    }else{
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release(); // Devuelve la conexión al pool
  }
});
