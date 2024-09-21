import Container from '../../components/common/Container';

interface ICreateBetLayout {
  children: React.ReactNode;
}

const CreateBetLayout = ({ children }: ICreateBetLayout) => {
  return <Container className="bg-bg-surface">{children}</Container>;
};

export default CreateBetLayout;
