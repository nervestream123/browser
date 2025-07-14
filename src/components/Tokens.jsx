import { Flex, Text } from '@radix-ui/themes';

function Tokens() {
  return (
    <Flex width="100%" align="center" className="items-center py-[5px]">
      <Text size="1" className="pr-[5px] cursor-pointer">Input: 200</Text>
      <Text size="1" className="cursor-pointer">Output: 200</Text>
    </Flex>
  );
}

export default Tokens;
