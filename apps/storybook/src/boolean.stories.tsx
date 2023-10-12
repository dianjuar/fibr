import f from "@fiber/core";
import { FiberForm, Fields } from "@fiber/react";
import { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { DevTool } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";

const meta: Meta = {
  title: "Fiber / Boolean",
};

export default meta;

type Story = StoryObj;

const defaultSchema = z.object({
  name: z.string(),
  read_example: z.boolean(),
  split_demo: z.string(),
});
export const Default: Story = {
  render: () => (
    <FiberForm
      onSubmit={console.log}
      blueprint={f.form<z.infer<typeof defaultSchema>, Resolver<FieldValues>>({
        validation: zodResolver(defaultSchema),
        default_values: {
          read_example: true,
        },
        fields: {
          name: f.boolean({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }),
          read_example: f.boolean({
            label: "sample",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            readOnly: true,
          }),
          split_demo: f.boolean({
            label: "sample1",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            hidden: true,
          }),
        },
      })}
    >
      <Fields />
      <DevTool />
    </FiberForm>
  ),
};

const switchSchema = z.object({
  name: z.string(),
  check_button: z.boolean(),
  invisible: z.string(),
});

export const Switch: Story = {
  render: () => (
    <FiberForm
      onSubmit={console.log}
      blueprint={f.form<z.infer<typeof switchSchema>, Resolver<FieldValues>>({
        validation: zodResolver(switchSchema),
        default_values: {
          check_button: true,
        },
        fields: {
          name: f.boolean({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            options: {
              layout: "switch",
            },
          }),
          check_button: f.boolean({
            label: "Switch",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            options: {
              layout: "switch",
            },
            readOnly: true,
          }),
          invisible: f.boolean({
            label: "Name",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

            options: {
              layout: "switch",
            },
            hidden: true,
          }),
        },
      })}
    >
      <Fields />
      <DevTool />
    </FiberForm>
  ),
};
