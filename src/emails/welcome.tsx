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
                brand: "hsl(180, 25%, 25%)",
                offwhite: "hsl(39, 77%, 85%)",
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
        <Body className="bg-offwhite font-sans text-base text-brand">
          <Img
            src={`https://res.cloudinary.com/doqpfkbrx/image/upload/v1715742795/logos/long-without-background/Journaler_Logo_3_bwwqxx.png`}
            width="197.75"
            height="22.5"
            alt="Journaler Logo"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-[hsl(39, 77%, 85%)]">
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
                href={`${config.baseUrl}/prompts`}
                className="bg-brand rounded-lg px-[18px] py-3 text-white"
              >
                Explore Top Prompts
              </Button>
              <Button
                href={`${config.baseUrl}/categories`}
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
