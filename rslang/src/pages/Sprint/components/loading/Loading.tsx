import loading from '../../../../images/loading.gif';

export function Loading() {
  return (
    <div className="sprint-frame">
      <img src={loading} alt="loading" className="loading user-select_none" />
    </div>
  );
}
