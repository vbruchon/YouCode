"use client";

import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";

export const LoginButton = () => {
  const mutation = useMutation({
    mutationFn: async () => signIn(),
  });

  return (
    <Button
      variant="outline"
      size="default"
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate();
      }}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={16} />
      ) : (
        <LogIn size={50} className="w-4 h-4 mr-2" />
      )}
      Login
    </Button>
  );
};

/* 
[x] Ajouter le bouton de connexion avec GitHub dans l'en-tête :

[x] Mettre en place la connexion avec GitHub :

[x] Mettre en place le menu déroulant ("dropdown") :

[x] Afficher le bouton "Connexion" lorsque l'utilisateur n'est pas connecté :

[x] Afficher l'avatar et le nom de l'utilisateur lorsque connecté :

[x] Ajouter la fonctionnalité de déconnexion :

[x] Afficher une alerte avant la déconnexion :




Tu dois ajouter dans l'en-tête un bouton permettant de se connecter avec `GitHub`.
Ensuite, l'utilisateur doit être capable de se déconnecter.
Notre client souhaite avoir un menu déroulant ("dropdown") pour cela.
Lorsqu'on n'est pas connecté : Afficher un bouton "Connexion".
Lorsqu'on est connecté : Afficher son profil et permettre de cliquer dessus pour
se déconnecter. Attention, afin d'éviter les déconnexions par erreur, 
notre client souhaite que tu affiches une alerte demandant à l'utilisateur s'il
est sûr de vouloir se déconnecter. */
