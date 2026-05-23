/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SessionConfig {
  topic: string;
  date: string;
  time: string;
  price: number;
}

export interface Registration {
  id?: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  date: string;
  time: string;
  price: number;
  createdAt: string;
  paymentId: string;
  status: "pending" | "paid";
}

export interface ContactQuery {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface Blog {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
