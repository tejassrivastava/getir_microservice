import request from "supertest";

jest.setTimeout(10000);
let server: { close: (arg0: jest.DoneCallback) => void };
beforeAll(async () => {
  const mod = await import("../../server");
  server = (mod as any).default;
});
afterAll((done) => {
  if (server) {
    server.close(done);
  }

  done();
});
describe("POST Valid Date /api/records/all", () => {
  test("On Valid Request should respond with 200", async () => {
    const response = await request(server).post("/api/records/all").send({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 170,
    });
    expect(response.statusCode).toBe(200);
  });
  test("HTTP Code 400 if stardate is invalid", async () => {
    const response = await request(server).post("/api/records/all").send({
      endDate: "2018-02-02",
      minCount: 1,
      maxCount: 170,
    });

    // expect(response.statusCode).toBe(200);
    expect(response.statusCode).toBe(400);
  });
  test("HTTP Code 400 if endDate is invalid", async () => {
    const response = await request(server).post("/api/records/all").send({
      startDate: "2018-02-02",
      minCount: 1,
      maxCount: 170,
    });

    // expect(response.statusCode).toBe(200);
    expect(response.statusCode).toBe(400);
  });
  test("HTTP Code 400 if mincount is invalid", async () => {
    const response = await request(server).post("/api/records/all").send({
      startDate: "2018-02-02",
      endDate: "2018-02-02",
      maxCount: 170,
    });

    // expect(response.statusCode).toBe(200);
    expect(response.statusCode).toBe(400);
  });
  test("HTTP Code 400 if maxcount is invalid", async () => {
    const response = await request(server).post("/api/records/all").send({
      startDate: "2018-02-02",
      endDate: "2018-02-02",
      minCount: 170,
    });

    // expect(response.statusCode).toBe(200);
    expect(response.statusCode).toBe(400);
  });
});
