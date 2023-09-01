import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  foreignKey,
  int,
  varchar,
  index,
  unique,
  date,
  time,
  char,
  datetime,
  longtext,
  text,
  decimal,
  bigint
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const ancAnexoschamados = mysqlTable("anc_anexoschamados", {
  chaCod: int("cha_cod")
    .notNull()
    .references(() => chaChamados.chaCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  ancCod: int("anc_cod").notNull(),
  ancNom: varchar("anc_nom", { length: 50 }).notNull()
  // Warning: Can't parse longblob from database
  // longblobType: longblob("anc_blb").notNull(),
});

export const aniAnexosinteracao = mysqlTable(
  "ani_anexosinteracao",
  {
    aniCod: int("ani_cod").default(0).notNull(),
    ichCod: int("ich_cod"),
    aniNom: varchar("ani_nom", { length: 50 })
  },
  (table) => {
    return {
      fkAniIch: index("fk_ani_ich").on(table.ichCod)
    };
  }
);

export const ascAssuntoschamados = mysqlTable("asc_assuntoschamados", {
  ascCod: int("asc_cod").notNull(),
  ascDsc: varchar("asc_dsc", { length: 50 }).notNull()
});

export const atcAtribuicoeschamados = mysqlTable(
  "atc_atribuicoeschamados",
  {
    chaCod: int("cha_cod")
      .notNull()
      .references(() => chaChamados.chaCod, {
        onDelete: "cascade",
        onUpdate: "cascade"
      }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    atcDat: date("atc_dat", { mode: "string" }).notNull(),
    atcHor: time("atc_hor").notNull(),
    usuCod: int("usu_cod")
      .notNull()
      .references(() => usuUsuarios.usuCod, {
        onDelete: "restrict",
        onUpdate: "cascade"
      }),
    atcAtv: char("atc_atv", { length: 1 })
  },
  (table) => {
    return {
      pkAtc: unique("pk_atc").on(table.chaCod, table.atcDat, table.atcHor)
    };
  }
);

//CHAVE PRIMÁRIA DEFINIDA
export const atvAtivacao = mysqlTable("atv_ativacao", {
  laboratorio: bigint("laboratorio", { mode: "number" })
    .notNull()
    .primaryKey()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  nomeComputador: varchar("nome_computador", { length: 50 })
    .notNull()
    .primaryKey(),
  chave: varchar("chave", { length: 20 }).notNull(),
  ultimoAcesso: datetime("ultimo_acesso", { mode: "string" }),
  ultimoAcessoVersaoId: varchar("ultimo_acesso_versao_id", { length: 50 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  ultimoAcessoVersaoData: date("ultimo_acesso_versao_data", { mode: "string" })
});

export const bkpBackupsremotos = mysqlTable("bkp_backupsremotos", {
  labCod: bigint("lab_cod", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  ativo: char("ativo", { length: 1 }).default('"S"').notNull(),
  servidor: varchar("servidor", { length: 50 }),
  usuario: varchar("usuario", { length: 50 }),
  senha: varchar("senha", { length: 20 }),
  horarios: varchar("horarios", { length: 20 }),
  prefixoNomeArquivo: varchar("prefixo_nome_arquivo", { length: 30 }),
  dadosNome: varchar("dados_nome", { length: 50 }),
  dadosData: datetime("dados_data", { mode: "string" }),
  dadosTamanho: int("dados_tamanho"),
  logsNome: varchar("logs_nome", { length: 50 }),
  logsData: datetime("logs_data", { mode: "string" }),
  logsTamanho: int("logs_tamanho"),
  ultimaVerificacao: datetime("ultima_verificacao", { mode: "string" })
});

export const chaChamados = mysqlTable("cha_chamados", {
  chaCod: int("cha_cod").notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  chaAbeDat: date("cha_abe_dat", { mode: "string" }).notNull(),
  chaAbeHor: time("cha_abe_hor").notNull(),
  usuCod: int("usu_cod").references(() => usuUsuarios.usuCod, {
    onDelete: "restrict",
    onUpdate: "cascade"
  }),
  ascCod: int("asc_cod")
    .notNull()
    .references(() => ascAssuntoschamados.ascCod, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  labCod: bigint("lab_cod", { mode: "number" }).references(
    () => wlLabLaboratorios.labCod,
    { onDelete: "restrict", onUpdate: "cascade" }
  ),
  chaSolNom: varchar("cha_sol_nom", { length: 60 }).notNull(),
  chaSolTel: varchar("cha_sol_tel", { length: 50 }),
  chaSolEma: varchar("cha_sol_ema", { length: 50 }),
  chaTit: varchar("cha_tit", { length: 100 }).notNull(),
  chaDsc: longtext("cha_dsc").notNull(),
  // Warning: Can't parse longblob from database
  // longblobType: longblob("cha_arq_anx"),
  chaUrg: char("cha_urg", { length: 1 }).notNull(),
  chaPri: int("cha_pri").notNull(),
  chaSit: char("cha_sit", { length: 1 }),
  chaSts: char("cha_sts", { length: 1 }).notNull()
});

export const claContatoslaboratorios = mysqlTable("cla_contatoslaboratorios", {
  labCod: bigint("lab_cod", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  claCod: int("cla_cod").notNull(),
  claDsc: varchar("cla_dsc", { length: 100 }).notNull(),
  claNome: varchar("cla_nome", { length: 100 })
});

export const cnfConfiguracoes = mysqlTable("cnf_configuracoes", {
  cnfDsc: varchar("CNF_DSC", { length: 100 }).notNull(),
  cnfTpo: char("CNF_TPO", { length: 1 }),
  cnfVlrTxt: longtext("CNF_VLR_TXT")
  // Warning: Can't parse longblob from database
  // longblobType: longblob("CNF_VLR_BLB"),
  // Warning: Can't parse longblob from database
  // longblobType: longblob("CNF_IMG"),
});

export const configuracao = mysqlTable("configuracao", {
  descricao: varchar("descricao", { length: 50 }).notNull(),
  tipo: char("tipo", { length: 1 }).default('"T"').notNull(),
  valorTexto: varchar("valor_texto", { length: 500 })
  // Warning: Can't parse longblob from database
  // longblobType: longblob("valor_blob"),
});

export const dispositivoAndroid = mysqlTable("dispositivo_android", {
  laboratorio: bigint("laboratorio", { mode: "number" }).notNull(),
  gcmRegistrationId: varchar("gcm_registration_id", { length: 200 }).notNull(),
  imei: varchar("imei", { length: 20 }).default('""'),
  descricao: varchar("descricao", { length: 100 }),
  numeroTelefone: varchar("numero_telefone", { length: 20 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dataAtivacao: date("data_ativacao", { mode: "string" }),
  status: char("status", { length: 1 })
});

export const dispositivoMovel = mysqlTable("dispositivo_movel", {
  labCod: bigint("lab_cod", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  dsmDvcId: varchar("dsm_dvc_id", { length: 20 }).notNull(),
  dsmDes: text("dsm_des").notNull(),
  dsmGcmId: text("dsm_gcm_id").notNull(),
  dsmDth: datetime("dsm_dth", { mode: "string" }).notNull(),
  dsmUsuAut: char("dsm_usu_aut", { length: 1 }),
  dsmSts: char("dsm_sts", { length: 1 }).default('"D"').notNull()
});

export const dowDownloads = mysqlTable("dow_downloads", {
  dowCod: int("dow_cod").notNull(),
  dowNom: varchar("dow_nom", { length: 100 }).notNull(),
  dowLab: varchar("dow_lab", { length: 100 }).notNull(),
  dowTel: varchar("dow_tel", { length: 20 }),
  dowEma: varchar("dow_ema", { length: 50 }).notNull(),
  dowCid: varchar("dow_cid", { length: 100 }).notNull(),
  dowEst: varchar("dow_est", { length: 2 }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dowDat: date("dow_dat", { mode: "string" }).notNull(),
  dowHor: time("dow_hor").notNull(),
  dowSts: varchar("dow_sts", { length: 1 }).default('"N"'),
  dowObs: text("dow_obs")
});

export const email = mysqlTable("email", {
  codigo: int("codigo").notNull(),
  origem: varchar("origem", { length: 200 }),
  servidor: varchar("servidor", { length: 50 }),
  para: varchar("para", { length: 300 }),
  cco: varchar("cco", { length: 300 }),
  assunto: varchar("assunto", { length: 100 }),
  mensagem: longtext("mensagem"),
  status: char("status", { length: 1 }),
  dataInclusao: datetime("data_inclusao", { mode: "string" }),
  dataHoraEnvio: datetime("data_hora_envio", { mode: "string" })
});

export const envEmails = mysqlTable("env_emails", {
  codigo: int("codigo").notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  data: date("data", { mode: "string" }).notNull(),
  hora: time("hora").notNull(),
  origem: varchar("origem", { length: 200 }),
  para: varchar("para", { length: 300 }).notNull(),
  cco: varchar("cco", { length: 300 }),
  assunto: varchar("assunto", { length: 100 }).notNull(),
  anexo: varchar("anexo", { length: 100 }),
  mensagem: longtext("mensagem")
});

export const erros = mysqlTable("erros", {
  codigo: bigint("codigo", { mode: "number" }).notNull(),
  laboratorio: bigint("laboratorio", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  data: date("data", { mode: "string" }),
  hora: time("hora"),
  computador: varchar("computador", { length: 100 }),
  usuarioLogado: varchar("usuario_logado", { length: 100 }),
  tela: varchar("tela", { length: 100 }),
  controleAtivo: varchar("controle_ativo", { length: 100 }),
  classe: varchar("classe", { length: 100 }),
  memoria: varchar("memoria", { length: 100 }),
  hashVersaoSistema: varchar("hash_versao_sistema", { length: 50 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dataVersaoSistema: date("data_versao_sistema", { mode: "string" }),
  erro: text("erro")
});

export const fcoFormascontato = mysqlTable("fco_formascontato", {
  fcoCod: int("fco_cod").default(0).notNull(),
  fcoDsc: varchar("fco_dsc", { length: 50 })
});

export const gruGruposusuarios = mysqlTable(
  "gru_gruposusuarios",
  {
    gruCod: int("gru_cod").default(0).notNull(),
    gruDsc: varchar("gru_dsc", { length: 100 }),
    gruPer: text("gru_per")
  },
  (table) => {
    return {
      gruPk: unique("gru_pk").on(table.gruCod)
    };
  }
);

export const ichInteracoeschamados = mysqlTable("ich_interacoeschamados", {
  ichCod: int("ich_cod").default(0).notNull(),
  chaCod: int("cha_cod")
    .notNull()
    .references(() => chaChamados.chaCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  ichDat: date("ich_dat", { mode: "string" }).notNull(),
  ichHor: time("ich_hor").notNull(),
  ichNom: varchar("ich_nom", { length: 50 }),
  ichDsc: longtext("ich_dsc").notNull()
});

export const ichInteracoeschamadosCopy = mysqlTable(
  "ich_interacoeschamados_copy",
  {
    ichCod: int("ich_cod"),
    chaCod: int("cha_cod")
      .notNull()
      .references(() => chaChamados.chaCod, {
        onDelete: "restrict",
        onUpdate: "restrict"
      }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    ichDat: date("ich_dat", { mode: "string" }).notNull(),
    ichHor: time("ich_hor").notNull(),
    ichNom: varchar("ich_nom", { length: 50 }),
    ichDsc: longtext("ich_dsc").notNull()
  }
);

export const ifaItensfaturamento = mysqlTable("ifa_itensfaturamento", {
  labCod: bigint("lab_cod", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  ifaCod: int("ifa_cod").notNull(),
  ifaQtd: int("ifa_qtd").notNull(),
  ifaDsc: varchar("ifa_dsc", { length: 100 }).notNull(),
  ifaVlr: decimal("ifa_vlr", { precision: 15, scale: 2 }).notNull()
});

export const inlInformacoeslaboratorios = mysqlTable(
  "inl_informacoeslaboratorios",
  {
    labCod: bigint("lab_cod", { mode: "number" }).references(
      () => wlLabLaboratorios.labCod,
      { onDelete: "restrict", onUpdate: "cascade" }
    ),
    inlCod: int("inl_cod").default(0).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    inlDat: date("inl_dat", { mode: "string" }),
    inlHor: time("inl_hor"),
    inlDsc: text("inl_dsc"),
    usuCod: int("usu_cod")
  }
);

export const integracaoApoio = mysqlTable("integracao_apoio", {
  codigo: int("codigo").notNull(),
  laboratorio: bigint("laboratorio", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  descricao: varchar("descricao", { length: 100 })
});

export const modEmails = mysqlTable("mod_emails", {
  codigo: int("codigo").default(0).notNull(),
  nome: varchar("nome", { length: 100 }),
  assunto: varchar("assunto", { length: 100 }),
  anexo: varchar("anexo", { length: 100 }),
  conteudo: longtext("conteudo")
});

//CHAVE PRIMÁRIA DEFINIDA
export const prestador = mysqlTable(
  "prestador",
  {
    codigo: int("codigo").notNull().primaryKey(),
    cpfCnpj: varchar("cpf_cnpj", { length: 18 }).notNull(),
    inscricaoMunicipal: varchar("inscricao_municipal", { length: 20 }),
    razaoSocial: varchar("razao_social", { length: 100 }).notNull(),
    nomeFantasia: varchar("nome_fantasia", { length: 100 }).notNull(),
    tipoLogradouro: varchar("tipo_logradouro", { length: 20 }),
    logradouro: varchar("logradouro", { length: 100 }),
    numero: varchar("numero", { length: 15 }),
    complemento: varchar("complemento", { length: 45 }),
    tipoBairro: varchar("tipo_bairro", { length: 45 }),
    bairro: varchar("bairro", { length: 50 }),
    cidadeCodigo: varchar("cidade_codigo", { length: 20 }),
    municipio: int("municipio"),
    cep: varchar("cep", { length: 9 }),
    cidade: varchar("cidade", { length: 45 }),
    uf: varchar("uf", { length: 2 }),
    dddTelefone: varchar("ddd_telefone", { length: 2 }),
    telefone: varchar("telefone", { length: 20 }),
    dddFax: varchar("ddd_fax", { length: 2 }),
    fax: varchar("fax", { length: 20 }),
    contato: varchar("contato", { length: 50 }),
    email: varchar("email", { length: 200 })
    // Warning: Can't parse longblob from database
    // longblobType: longblob("logo"),
  },
  (table) => {
    return {
      fkPrestadorMunicipio: index("fk_prestador_municipio").on(table.municipio)
    };
  }
);

export const remetenteSmtp = mysqlTable("remetente_smtp", {
  codigo: int("codigo").notNull(),
  nome: varchar("nome", { length: 100 }),
  email: varchar("email", { length: 100 }),
  descricao: varchar("descricao", { length: 100 }),
  servidor: varchar("servidor", { length: 100 }),
  porta: varchar("porta", { length: 10 }),
  usuario: varchar("usuario", { length: 100 }),
  senha: varchar("senha", { length: 100 }),
  requerAutenticacao: char("requer_autenticacao", { length: 1 })
    .default('"S"')
    .notNull(),
  conexaoSegura: char("conexao_segura", { length: 1 }).default('"N"').notNull(),
  limiteEnvioPorHora: int("limite_envio_por_hora"),
  resposta: varchar("resposta", { length: 100 }),
  principal: char("principal", { length: 1 }).default('"N"'),
  assinatura: longtext("assinatura")
});

export const remetenteSmtp2 = mysqlTable("remetente_smtp2", {
  codigo: int("codigo").notNull(),
  nome: varchar("nome", { length: 100 }),
  descricao: varchar("descricao", { length: 100 }),
  email: varchar("email", { length: 100 }),
  servidor: varchar("servidor", { length: 100 }),
  porta: varchar("porta", { length: 10 }),
  usuario: varchar("usuario", { length: 100 }),
  senha: varchar("senha", { length: 100 }),
  requerAutenticacao: char("requer_autenticacao", { length: 1 })
    .default('"S"')
    .notNull(),
  conexaoSegura: char("conexao_segura", { length: 1 }).default('"N"').notNull(),
  resposta: varchar("resposta", { length: 100 })
});

export const remetenteSmtpLaboratorio = mysqlTable(
  "remetente_smtp_laboratorio",
  {
    laboratorio: bigint("laboratorio", { mode: "number" })
      .notNull()
      .references(() => wlLabLaboratorios.labCod, {
        onDelete: "cascade",
        onUpdate: "cascade"
      }),
    servidor: varchar("servidor", { length: 100 }),
    porta: varchar("porta", { length: 10 }),
    requerAutenticacao: char("requer_autenticacao", { length: 1 }),
    conexaoSegura: char("conexao_segura", { length: 1 }),
    usuario: varchar("usuario", { length: 100 }),
    senha: varchar("senha", { length: 100 }),
    nome: varchar("nome", { length: 100 }),
    emailEnvio: varchar("email_envio", { length: 100 }),
    emailResposta: varchar("email_resposta", { length: 100 })
  }
);

export const serServicos = mysqlTable("ser_servicos", {
  serCod: int("ser_cod").notNull(),
  serDsc: varchar("ser_dsc", { length: 100 }).notNull(),
  serVlr: decimal("ser_vlr", { precision: 15, scale: 2 }).notNull()
});

export const sessao = mysqlTable("sessao", {
  id: varchar("id", { length: 100 }).notNull(),
  usuario: int("usuario"),
  manterConectado: char("manter_conectado", { length: 1 }),
  ultimaInteracao: datetime("ultima_interacao", { mode: "string" })
});

export const usuUsuarios = mysqlTable(
  "usu_usuarios",
  {
    usuCod: int("usu_cod").default(0).notNull(),
    usuEma: varchar("usu_ema", { length: 100 }),
    usuNom: varchar("usu_nom", { length: 100 }),
    usuSen: varchar("usu_sen", { length: 50 }),
    usuSts: char("usu_sts", { length: 1 }),
    gruCod: int("gru_cod").references(() => gruGruposusuarios.gruCod, {
      onDelete: "restrict",
      onUpdate: "cascade"
    })
    // Warning: Can't parse longblob from database
    // longblobType: longblob("imagem"),
  },
  (table) => {
    return {
      pkUsu: unique("pk_usu").on(table.usuCod)
    };
  }
);

export const wlCmsComandossql = mysqlTable("wl_cms_comandossql", {
  labCod: bigint("lab_cod", { mode: "number" })
    .notNull()
    .references(() => wlLabLaboratorios.labCod, {
      onDelete: "restrict",
      onUpdate: "restrict"
    }),
  cmsCod: int("cms_cod").default(0).notNull(),
  cmsDsc: varchar("cms_dsc", { length: 200 }),
  cmsCmd: longtext("cms_cmd"),
  cmsSts: char("cms_sts", { length: 1 })
});

export const wlImsImagenssolicitacao = mysqlTable("wl_ims_imagenssolicitacao", {
  solCod: int("SOL_COD")
    .notNull()
    .references(() => wlSolSolicitacoes.solCod, {
      onDelete: "cascade",
      onUpdate: "cascade"
    }),
  imsCod: int("IMS_COD").notNull()
  // Warning: Can't parse longblob from database
  // longblobType: longblob("IMS_IMG").notNull(),
});

//CHAVE PRIMÁRIA DEFINIDA
export const wlLabLaboratorios = mysqlTable(
  "wl_lab_laboratorios",
  {
    labCod: bigint("LAB_COD", { mode: "number" }).notNull().primaryKey(),
    labAtv: char("LAB_ATV", { length: 1 }).default('"S"'),
    labDoc: varchar("LAB_DOC", { length: 20 }),
    labCnpj: varchar("LAB_CNPJ", { length: 18 }),
    labNom: varchar("LAB_NOM", { length: 100 }).notNull(),
    labLgr: varchar("LAB_LGR", { length: 300 }),
    labNum: varchar("LAB_NUM", { length: 20 }),
    labCmp: varchar("LAB_CMP", { length: 50 }),
    labBai: varchar("LAB_BAI", { length: 50 }),
    labCid: varchar("LAB_CID", { length: 100 }),
    labUf: varchar("LAB_UF", { length: 2 }),
    labCep: varchar("LAB_CEP", { length: 15 }),
    labFil: varchar("LAB_FIL", { length: 300 }),
    labTel: varchar("LAB_TEL", { length: 100 }),
    labEma: varchar("LAB_EMA", { length: 100 }),
    // Warning: Can't parse longblob from database
    // longblobType: longblob("LAB_LOG"),
    labFatTpo: char("LAB_FAT_TPO", { length: 1 }),
    labHarId: varchar("LAB_HAR_ID", { length: 100 }),
    labIds: varchar("LAB_IDS", { length: 100 }),
    labQtdAce: int("LAB_QTD_ACE"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labDatIni: date("LAB_DAT_INI", { mode: "string" }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labDatFim: date("LAB_DAT_FIM", { mode: "string" }),
    labChvLib: varchar("LAB_CHV_LIB", { length: 100 }),
    labLicFrcAtv: char("LAB_LIC_FRC_ATV", { length: 1 }).default('"N"'),
    labFatNom: varchar("LAB_FAT_NOM", { length: 100 }),
    labFatInsMun: varchar("LAB_FAT_INS_MUN", { length: 50 }),
    labFatInsEst: varchar("LAB_FAT_INS_EST", { length: 50 }),
    labFatDia: int("LAB_FAT_DIA"),
    labFatEma: varchar("LAB_FAT_EMA", { length: 100 }),
    labFatObs: text("LAB_FAT_OBS"),
    labFatVlr: decimal("LAB_FAT_VLR", { precision: 15, scale: 2 }),
    labFatComAtv: char("LAB_FAT_COM_ATV", { length: 1 }),
    labFatComSts: char("LAB_FAT_COM_STS", { length: 1 }),
    labFatComNom: varchar("LAB_FAT_COM_NOM", { length: 50 }),
    labFatComPrc: decimal("LAB_FAT_COM_PRC", { precision: 15, scale: 2 }),
    labCon: varchar("LAB_CON", { length: 100 }),
    labObs: varchar("LAB_OBS", { length: 100 }),
    labDiaRst: int("LAB_DIA_RST"),
    labChvUso: varchar("LAB_CHV_USO", { length: 100 }),
    labChvAtv: char("LAB_CHV_ATV", { length: 1 }),
    labMonAut: char("LAB_MON_AUT", { length: 1 }).default('"S"'),
    labMonBkp: char("LAB_MON_BKP", { length: 1 }).default('"S"'),
    labMonWeb: char("LAB_MON_WEB", { length: 1 }).default('"S"'),
    labMonSmtpHos: varchar("LAB_MON_SMTP_HOS", { length: 100 }).default(
      '"mail.wiselab.com.br"'
    ),
    labMonSmtpPor: varchar("LAB_MON_SMTP_POR", { length: 10 }).default('"587"'),
    labMonSmtpUsr: varchar("LAB_MON_SMTP_USR", { length: 50 }).default(
      '"monitor@wiselab.com.br"'
    ),
    labMonSmtpPas: varchar("LAB_MON_SMTP_PAS", { length: 50 }).default(
      '"monitor.123"'
    ),
    labBkpUltOk: datetime("LAB_BKP_ULT_OK", { mode: "string" }),
    labBkpRemUltOk: datetime("LAB_BKP_REM_ULT_OK", { mode: "string" }),
    labBkpRemCor: char("LAB_BKP_REM_COR", { length: 1 }).default('"N"'),
    labBkpRemAtv: char("LAB_BKP_REM_ATV", { length: 1 }).default('"N"'),
    labBkpRemFtpHos: varchar("LAB_BKP_REM_FTP_HOS", { length: 100 }).default(
      '"ftp.wiselab.com.br"'
    ),
    labBkpRemFtpFld: varchar("LAB_BKP_REM_FTP_FLD", { length: 100 }),
    labBkpRemFtpUsr: varchar("LAB_BKP_REM_FTP_USR", { length: 50 }).default(
      '"backupremoto"'
    ),
    labBkpRemFtpPas: varchar("LAB_BKP_REM_FTP_PAS", { length: 50 }).default(
      '"backupremoto.123"'
    ),
    labBkpRemFtpMdo: char("LAB_BKP_REM_FTP_MDO", { length: 1 }),
    labBkpRemFtpNom: varchar("LAB_BKP_REM_FTP_NOM", { length: 50 }),
    labBkpRemHor: varchar("LAB_BKP_REM_HOR", { length: 50 }),
    labPubWeb: char("LAB_PUB_WEB", { length: 1 }).default('"N"'),
    labNomWeb: varchar("LAB_NOM_WEB", { length: 100 }),
    labWebUltEnv: datetime("LAB_WEB_ULT_ENV", { mode: "string" }),
    labWebQtdLot: int("LAB_WEB_QTD_LOT").default(50),
    labWebFtpHos: varchar("LAB_WEB_FTP_HOS", { length: 100 }),
    labWebFtpUsr: varchar("LAB_WEB_FTP_USR", { length: 50 }),
    labWebFtpPas: varchar("LAB_WEB_FTP_PAS", { length: 50 }),
    labWebDowMulLau: char("LAB_WEB_DOW_MUL_LAU", { length: 1 }).default('"S"'),
    labVrsMon: varchar("LAB_VRS_MON", { length: 32 }),
    labVrsAut: varchar("LAB_VRS_AUT", { length: 32 }),
    labVrsBkp: varchar("LAB_VRS_BKP", { length: 32 }),
    labVrsWeb: varchar("LAB_VRS_WEB", { length: 32 }),
    labVrsBd: varchar("LAB_VRS_BD", { length: 32 }),
    labAtuMon: char("LAB_ATU_MON", { length: 1 }).default('"S"'),
    labAtuAut: char("LAB_ATU_AUT", { length: 1 }).default('"S"'),
    labAtuBkp: char("LAB_ATU_BKP", { length: 1 }).default('"S"'),
    labAtuWeb: char("LAB_ATU_WEB", { length: 1 }).default('"S"'),
    labAtuBd: char("LAB_ATU_BD", { length: 1 }).default('"S"'),
    labAtuSis: char("LAB_ATU_SIS", { length: 1 }),
    labBdSrvVrs: varchar("LAB_BD_SRV_VRS", { length: 50 }),
    labBdSrvHos: varchar("LAB_BD_SRV_HOS", { length: 50 }),
    labBdArq: varchar("LAB_BD_ARQ", { length: 200 }),
    labBdOds: varchar("LAB_BD_ODS", { length: 10 }),
    labDirDad: char("LAB_DIR_DAD", { length: 1 }),
    comoEncontrou: varchar("comoEncontrou", { length: 200 }),
    comoEncontrouOutro: varchar("comoEncontrouOutro", { length: 200 }),
    labUtiNot: char("LAB_UTI_NOT", { length: 1 }).default('"N"'),
    labEmiBol: char("LAB_EMI_BOL", { length: 1 }).default('"N"'),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labPriMen: date("LAB_PRI_MEN", { mode: "string" }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labUltRea: date("LAB_ULT_REA", { mode: "string" }),
    labPubAnd: char("LAB_PUB_AND", { length: 1 }).default('"N"'),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labAndTstFim: date("LAB_AND_TST_FIM", { mode: "string" }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labWldTstFim: date("LAB_WLD_TST_FIM", { mode: "string" }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    labBkpRemTstFim: date("LAB_BKP_REM_TST_FIM", { mode: "string" }),
    labImgCen: varchar("LAB_IMG_CEN", { length: 50 }),
    labPedidoRecente: varchar("LAB_PEDIDO_RECENTE", { length: 150 }),
    labWeblaudosCondicaoFinanceira: varchar(
      "LAB_WEBLAUDOS_CONDICAO_FINANCEIRA",
      { length: 50 }
    ),
    labMotDes: text("LAB_MOT_DES"),
    labSmsAtv: char("LAB_SMS_ATV", { length: 1 }),
    labSmsEnviarDadosPedido: char("LAB_SMS_ENVIAR_DADOS_PEDIDO", { length: 1 }),
    labSmsMensagemDadosPedido: varchar("LAB_SMS_MENSAGEM_DADOS_PEDIDO", {
      length: 160
    }),
    labSmsEnviarExamesFinalizados: char("LAB_SMS_ENVIAR_EXAMES_FINALIZADOS", {
      length: 1
    }),
    labSmsMensagemExamesFinalizados: varchar(
      "LAB_SMS_MENSAGEM_EXAMES_FINALIZADOS",
      { length: 160 }
    ),
    labSmsTipoNomePaciente: char("LAB_SMS_TIPO_NOME_PACIENTE", { length: 1 }),
    labSmsAssinaturaLaboratorio: varchar("LAB_SMS_ASSINATURA_LABORATORIO", {
      length: 100
    }),
    labSmsInicioEnvios: int("LAB_SMS_INICIO_ENVIOS"),
    labSmsTerminoEnvios: int("LAB_SMS_TERMINO_ENVIOS"),
    labSmsIntervaloEnvios: int("LAB_SMS_INTERVALO_ENVIOS"),
    labSmsDdd: int("LAB_SMS_DDD"),
    weblaudosUsarNovoStorage: char("WEBLAUDOS_USAR_NOVO_STORAGE", {
      length: 1
    }).default('"S"'),
    weblaudosEmManutencao: char("WEBLAUDOS_EM_MANUTENCAO", { length: 1 }),
    weblaudosLoginRapido: char("WEBLAUDOS_LOGIN_RAPIDO", { length: 1 }),
    weblaudosExibirProntuario: char("WEBLAUDOS_EXIBIR_PRONTUARIO", {
      length: 1
    }),
    smsEmManutencao: char("SMS_EM_MANUTENCAO", { length: 1 }),
    smsUsarNovoStorage: char("SMS_USAR_NOVO_STORAGE", { length: 1 }),
    postoColetaAtivo: char("POSTO_COLETA_ATIVO", { length: 1 }),
    postoColetaEmManutencao: char("POSTO_COLETA_EM_MANUTENCAO", { length: 1 }),
    latitude: varchar("LATITUDE", { length: 50 }),
    longitude: varchar("LONGITUDE", { length: 50 }),
    site: varchar("SITE", { length: 200 }),
    hamachiStatus: char("HAMACHI_STATUS", { length: 1 }).default('"N"'),
    hamachiRede: varchar("HAMACHI_REDE", { length: 200 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    weblaudosExibirPedidosDesde: date("WEBLAUDOS_EXIBIR_PEDIDOS_DESDE", {
      mode: "string"
    })
  },
  (table) => {
    return {
      pkLab: unique("PK_LAB").on(table.labCod),
      unqLabCnpj: unique("UNQ_LAB_CNPJ").on(table.labCnpj)
    };
  }
);

export const wlModModulos = mysqlTable(
  "wl_mod_modulos",
  {
    modCod: int("mod_cod").default(0).notNull(),
    modDsc: varchar("mod_dsc", { length: 100 }).notNull()
  },
  (table) => {
    return {
      uniqueModDsc: unique("unique_mod_dsc").on(table.modDsc)
    };
  }
);

export const wlSolLab = mysqlTable(
  "wl_sol_lab",
  {
    solCod: int("SOL_COD")
      .default(0)
      .notNull()
      .references(() => wlSolSolicitacoes.solCod, {
        onDelete: "cascade",
        onUpdate: "cascade"
      }),
    labCod: bigint("LAB_COD", { mode: "number" })
      .notNull()
      .references(() => wlLabLaboratorios.labCod, {
        onDelete: "cascade",
        onUpdate: "cascade"
      })
  },
  (table) => {
    return {
      fkSolCod: index("FK_SOL_COD").on(table.solCod),
      fkLabCod: index("FK_LAB_COD").on(table.labCod),
      pk: unique("PK").on(table.solCod, table.labCod)
    };
  }
);

export const wlSolSolicitacoes = mysqlTable(
  "wl_sol_solicitacoes",
  {
    solCod: int("SOL_COD").default(0).notNull(),
    solSts: varchar("SOL_STS", { length: 50 }).default('"2"'),
    solTit: varchar("SOL_TIT", { length: 1000 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    solDatAbe: date("SOL_DAT_ABE", { mode: "string" }),
    solDscAbe: longtext("SOL_DSC_ABE"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    solDatCnc: date("SOL_DAT_CNC", { mode: "string" }),
    solDscCnc: longtext("SOL_DSC_CNC"),
    solDscEma: longtext("SOL_DSC_EMA"),
    solUrg: int("SOL_URG"),
    solPri: int("SOL_PRI"),
    modCod: int("MOD_COD").references(() => wlModModulos.modCod, {
      onDelete: "restrict",
      onUpdate: "cascade"
    })
  },
  (table) => {
    return {
      pkSol: unique("PK_SOL").on(table.solCod)
    };
  }
);
