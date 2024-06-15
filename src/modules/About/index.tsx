import { Button } from '@/components/ui/button';

export default function AboutModule() {
  return (
    <h1 className="">
      About
      <Button variant="primary">Button</Button>
      <Button variant="secondary_light">Button</Button>
      <Button variant="secondary_dark">Button</Button>
      <Button
        variant="light_outline"
        className="bg-elevation-a700 bg-opacity-25 text-elevation-a700 hover:border-elevation-a700 hover:bg-opacity-0 active:border-elevation-a700 active:bg-opacity-50 border border-elevation-a700 hover:border-opacity-25 active:border-opacity-25 border-opacity-25"
      >
        Button
      </Button>
      <Button variant="accent_red">Button</Button>
      <Button variant="accent_green">Button</Button>
    </h1>
  );
}
