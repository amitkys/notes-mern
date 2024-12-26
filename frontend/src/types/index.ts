import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Notes = {
  _id: any;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  isPinned: boolean;
};
