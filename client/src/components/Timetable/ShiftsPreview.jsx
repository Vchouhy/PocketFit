import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./Styles/ShiftPreviewStyled";
import defaultProfilePhoto from "../../assets/img/profilephoto.svg"

function ShiftsPreview({ display, setOverFlow }) {
  const shiftSelect = useSelector((state) => state.timetable.shiftSelect);

  console.log(shiftSelect);
  return (
    <Styles.BodyStyled>
      <Styles.BoxStyle>
        <Styles.TitleH2Styled>Turno</Styles.TitleH2Styled>
        <Styles.CloseButton
          onClick={() => {
            display(false);
            setOverFlow(false);
          }}
        >
          x
        </Styles.CloseButton>
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{marginRight: "2em"}}>
            <Styles.InicioDay>Horarios</Styles.InicioDay>
            <Styles.FinalDay>
              {shiftSelect.beginning}hs - {shiftSelect.ending}hs
            </Styles.FinalDay>
            <Styles.InicioDay>Fecha</Styles.InicioDay>
            <Styles.FinalDay>
              <p style={{color: "var(--darkBlue)"}}>{shiftSelect.weekday} - {shiftSelect.day}/{shiftSelect.month}/{shiftSelect.year}
              </p>
            </Styles.FinalDay>

            <Styles.InicioDay>Disponibilidad</Styles.InicioDay>
            <Styles.FinalDay style={{marginBottom: "0"}}>
              {shiftSelect.availability}/{shiftSelect.capacity}
            </Styles.FinalDay>
          </div>
          <Styles.contClientes>
            <h3>Clientes</h3>
            {shiftSelect.users.length ? (
              <Styles.divClientes>
                {shiftSelect.users.map((user) => (
                  <div>
                      {console.log(user)}
                      <img src={user.imageData ? 
                      `data:image/jpeg;base64, ${user.imageData}` 
                      : defaultProfilePhoto} alt={user.name + "-profile"}/>
                      
                    <h4>
                      {user.name} {user.lastname}
                    </h4>
                  </div>
                ))}
              </Styles.divClientes>
            ) : (
              <Styles.divClientes>Aun no hay turnos</Styles.divClientes>
            )}
          </Styles.contClientes>
        </div>
      </Styles.BoxStyle>
    </Styles.BodyStyled>
  );
}

export default ShiftsPreview;
