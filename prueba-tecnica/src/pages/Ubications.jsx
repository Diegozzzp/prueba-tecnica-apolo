import LocationList from "../components/LocationList";
import bannerImage from "../assets/ubicaciones.jpg";

export default function LocationsPage() {
  return (
    <div className="mt-24">
      <LocationList
        title="Explora las Ubicaciones del Multiverso"
        bannerImage={bannerImage}
      />
    </div>
  );
}
