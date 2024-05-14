import { config } from "@/lib/config";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { ReactNode } from "react";

interface DealbaseWelcomeEmailProps {
  steps?: {
    id: number;
    Description: ReactNode;
  }[];
  links?: string[];
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const DealbaseWelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Journaler</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#31a078",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite font-sans text-base">
          <Img
            src={`https://res.cloudinary.com/dealbase-africa/image/upload/v1693350283/dealbase/logo-full_ihhqhu.svg`}
            width="197.75"
            height="22.5"
            alt="dealbase.africa"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-white">
            <Heading className="my-0 text-center leading-8">
              Welcome to Journaler
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  We&apos;re excited to welcome you to the Journaler community.
                  We believe that there&apos;s a better way to reflect, write,
                  and connect through journaling. Our mission is to make
                  discovering and sharing journal prompts a joy, and to foster a
                  community of reflective writers.
                </Text>

                <Text className="text-base">
                  To get started, watch this 4-minute walk-through:
                  <Link href="mailto:support@dealbase.africa">
                    support@dealbase.africa
                  </Link>
                  .
                </Text>

                <Text className="text-base">
                  Everything in Journaler begins with exploring the best journal
                  prompts. Dive into our community&apos;s favorite prompts or
                  explore the top prompts in a category that interests you:
                </Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Button
                href={`${config.baseUrl}/dashboard`}
                className="bg-brand rounded-lg px-[18px] py-3 text-white"
              >
                Explore Top Prompts
              </Button>
              <Button
                href={`${config.baseUrl}/dashboard`}
                className="bg-brand rounded-lg px-[18px] py-3 text-white"
              >
                Discover Categories
              </Button>
            </Section>
            <Section>
              <Text className="text-base">
                Thanks for signing up! We&apos;re here to help you on your
                journaling journey. If you have any questions or feedback,
                contact us at{" "}
                <Link href="mailto:hello@journaler.com">
                  hello@journaler.com
                </Link>{" "}
                or reach out to us on Twitter.
                <br />– Journaler Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DealbaseWelcomeEmail;
