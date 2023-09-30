interface Props {
  params: { id: number };
}

// This method only work on page level;
// You get data by id on page level then pass it into component
// if you try to apply this method in component it will not work
export default function UserDetailPage({ params: { id } }: Props) {
  return <div>UserDetailPage {id}</div>;
}
