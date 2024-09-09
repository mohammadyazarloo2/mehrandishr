import Loading from "./Loading"

export default function PreLoader() {
  return (
    <div className="preloader">
      <div className="spinner"></div>
      <Loading />
    </div>
  )
}