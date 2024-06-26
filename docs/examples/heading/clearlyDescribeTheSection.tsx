import { ActivationCard, Box } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <ActivationCard
        dismissButton={{
          accessibilityLabel: 'Dismiss card',
          onDismiss: () => {},
        }}
        link={{
          href: 'https://pinterest.com',
          label: 'Claim your website now',
          accessibilityLabel: '',
        }}
        message="Grow distribution and track Pins linked to your website"
        status="notStarted"
        statusMessage="Not started"
        title="Claim your website"
      />
    </Box>
  );
}
