import { Context, Schema, Random } from "koishi";

export const name = "random-wheel";

export interface Config {
  TITLE: string;
  OPTIONS: string[];
}

export const Config: Schema<Config> = Schema.object({
  TITLE: Schema.string()
    .role("title")
    .description("转盘标题，会显示在输出消息中，留空则不显示标题"),
  OPTIONS: Schema.array(Schema.string())
    .required()
    .role("table")
    .description("转盘选项"),
});

export function apply(ctx: Context, config: Config) {
  ctx
    .command("wheel", config.TITLE || "幸运转盘")
    .action(async ({ session }) => {
      return (
        <>
          <quote id={session.messageId} />
          {config.TITLE ? `${config.TITLE}：` : ""}
          {Random.pick(config.OPTIONS)}
        </>
      );
    });
}
