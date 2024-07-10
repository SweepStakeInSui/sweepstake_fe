import React from 'react';

import Container from '@/components/common/Container';
import Typography from '@/components/common/Typography';

export default function HomeModule() {
  return (
    <Container className="mb-12">
      <div className="container mx-auto p-4 space-y-4">
        <Typography.Text size={10}>Text/ Regular-10</Typography.Text>
        <Typography.Text size={12}>Text/ Regular-12</Typography.Text>
        <Typography.Text size={13}>Text/ Regular-13</Typography.Text>
        <Typography.Text size={14}>Text/ Regular-14</Typography.Text>
        <Typography.Text size={15}>Text/ Regular-15</Typography.Text>
        <Typography.Text size={15} weight="medium">
          Text/ Medium-15
        </Typography.Text>
        <Typography.Text size={16}>Text/ Regular-16</Typography.Text>
        <Typography.Text size={16} weight="medium">
          Text/ Medium-16
        </Typography.Text>
        <Typography.Text size={18}>Text/ Regular-18</Typography.Text>
        <Typography.Text>Text/ Regular-18</Typography.Text>

        <Typography.Heading size={20}>Heading/ Semibold-20</Typography.Heading>
        <Typography.Heading size={24}>Heading/ Semibold-24</Typography.Heading>
        <Typography.Heading size={28}>Heading/ Semibold-28</Typography.Heading>
        <Typography.Heading size={32}>Heading/ Semibold-32</Typography.Heading>
        <Typography.Heading size={48}>Heading/ Semibold-48</Typography.Heading>
        <Typography.Heading size={64}>Heading/ Semibold-64</Typography.Heading>
      </div>
    </Container>
  );
}
