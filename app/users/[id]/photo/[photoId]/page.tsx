interface Props {
  params: { id: number; photoId: number };
}

// This method only work on page level;
// You get data by id on page level then pass it into component
// if you try to apply this method in component it will not work
export default function PhotoPage({ params: { id, photoId } }: Props) {
  return (
    <div>
      PhotoPage {id}, {photoId}
    </div>
  );
}
