import Container from '../../components/common/Container';

interface ICreateBetLayout {
  children: React.ReactNode;
}

const CreateBetLayout = ({ children }: ICreateBetLayout) => {
  return <Container size="sm">{children}</Container>;
};

export default CreateBetLayout;
