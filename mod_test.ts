import { assertEquals } from "https://deno.land/std@0.135.0/testing/asserts.ts";
import { bot } from "./bot.ts";

Deno.test("test starter function", async (): Promise<void> => {
  assertEquals(bot(), 0);
});
