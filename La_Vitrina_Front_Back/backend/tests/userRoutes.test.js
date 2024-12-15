const request = require("supertest");
const app = require("../index");

describe("Pruebas para rutas de usuarios", () => {
  let token;

  test("Debe registrar un nuevo usuario", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ username: "testuser", password: "testpassword" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  test("Debe iniciar sesión con usuario registrado", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "testpassword" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test("Debe acceder al perfil del usuario con token válido", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("username", "testuser");
  });

  test("Debe devolver 404 para rutas inexistentes", async () => {
    const res = await request(app).get("/api/users/nonexistent");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Ruta no encontrada");
  });
});