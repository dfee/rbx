describe("with-script", () => {
  it("should load", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".notification");
    const text = await page.$eval(".notification", e => e.textContent);
    expect(text).toEqual("Welcome to 👟 rbx");
  });

  it("should toggle on delete click", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".delete");
    await page.click(".delete");
    const text = await page.$eval(".container", e => e.textContent);
    expect(text).toEqual("You've closed the notification 👟");
  });
});
