import Button from '~/Layout/components/Button';

export default function MenuItem({ data, onClick, choose = false }) {
    return (
        <Button className="menu" to={data.to} leftIcon={data.icon} onClick={onClick} choose={choose}>
            {data.title}
        </Button>
    );
}
