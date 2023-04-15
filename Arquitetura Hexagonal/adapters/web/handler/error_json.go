package handler

import "encoding/json"

func jsonError(msg string) []byte {
	errResponse := struct {
		Message string `json:"message"`
	}{
		Message: msg,
	}

	r, err := json.Marshal(errResponse)
	if err != nil {
		return []byte(err.Error())
	}

	return r
}
