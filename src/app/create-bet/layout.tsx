import Container from '../../components/common/Container';

interface ICreateBetLayout {
  children: React.ReactNode;
}

const CreateBetLayout = ({ children }: ICreateBetLayout) => {
  return <Container px={0}>{children}</Container>;
};

export default CreateBetLayout;
