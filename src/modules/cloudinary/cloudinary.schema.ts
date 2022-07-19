import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ _id: false })
export class MediaType {
  @Prop()
  public_id: string;

  @Prop()
  url: string;
}
