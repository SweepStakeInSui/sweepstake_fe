import React from 'react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import { iconNames, Icons } from '@/components/common/Icon';

export default function StorybookModule() {
  return (
    <div>
      <Container className="py-4">
        <h2 className="text-lg font-bold">Icons</h2>
        <hr />
        <Flex className="items-center">
          {iconNames.map((iconName) =>
            React.createElement(Icons[iconName as keyof typeof Icons], {
              key: iconName,
            }),
          )}
        </Flex>
      </Container>
    </div>
  );
}
